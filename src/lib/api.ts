import axios, { AxiosError } from "axios";
import { AppError } from "~/utils/AppError";

export const api = axios.create({
  baseURL: "http://192.168.1.32:3333",
});

api.interceptors.response.use(undefined, (error: AxiosError<any>) => {
  if (typeof error.response?.data.message === "string") {
    return Promise.reject(new AppError(error.response.data.message));
  }

  return Promise.reject(error);
});
