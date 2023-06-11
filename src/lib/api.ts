import axios, { AxiosError } from "axios";
import { AppError } from "~/utils/AppError";
import { API_BASE_URL, STORAGE_KEYS } from "~/utils/constants";
import { storage } from "./storage";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

interface FailedRequest {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

let isRefreshing = false;
let failedRequestsQueue: FailedRequest[] = [];

api.interceptors.response.use(undefined, (error: AxiosError<any>) => {
  // se for status 401 = Unauthenticated
  if (error.response?.status === 401) {
    // se for error de token expirado, fazer refresh de token
    // config da request que vai ser repassada posteriormente para refazer este request
    const originalConfig = error.config;

    // somente fazer refresh de token se não tiver outra requisição fazendo refresh no momento
    if (!isRefreshing) {
      isRefreshing = true;
      const refreshToken = storage.getString(STORAGE_KEYS.refreshToken);

      api
        .post<{ token: string; refresh_token: string }>(
          "/sessions/refresh-token",
          {
            refresh_token: refreshToken,
          },
        )
        .then(({ data }) => {
          storage.set(STORAGE_KEYS.refreshToken, data.refresh_token);
          api.defaults.headers.Authorization = `Bearer ${data.token}`;

          // refaz as requisições na fila com novo token
          failedRequestsQueue.forEach(request => {
            request.onSuccess(data.token);
          });
        })
        .catch(refreshError => {
          // trata erro das requisições na fila caso tenha dado erro no refresh de token
          failedRequestsQueue.forEach(request => {
            request.onFailure(refreshError);
          });

          // faz logout caso tenha dado erro ao fazer refresh
          storage.delete(STORAGE_KEYS.user);
        })
        .finally(() => {
          // reseta isRefreshing e fila de requests
          isRefreshing = false;
          failedRequestsQueue = [];
        });
    }

    // adiciona fila de requests para serem tratadas após terminar refresh
    return new Promise((resolve, reject) => {
      failedRequestsQueue.push({
        onFailure: reject,
        onSuccess: newToken => {
          if (!originalConfig) {
            return resolve(api);
          }

          originalConfig.headers.Authorization = `Bearer ${newToken}`;

          // refaz request on success
          resolve(api(originalConfig));
        },
      });
    });
  }

  // retorna erros tratados
  if (typeof error.response?.data.message === "string") {
    return Promise.reject(new AppError(error.response.data.message));
  }

  // retorna outro erros normalmente
  return Promise.reject(error);
});
