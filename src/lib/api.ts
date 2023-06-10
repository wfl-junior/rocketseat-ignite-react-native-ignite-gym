import axios, { AxiosError } from "axios";
import { AppError } from "~/utils/AppError";
import { API_BASE_URL, STORAGE_KEYS } from "~/utils/constants";
import { storage } from "./storage";

const accessToken = storage.getString(STORAGE_KEYS.accessToken);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
});

api.interceptors.response.use(undefined, (error: AxiosError<any>) => {
  if (typeof error.response?.data.message === "string") {
    return Promise.reject(new AppError(error.response.data.message));
  }

  return Promise.reject(error);
});
