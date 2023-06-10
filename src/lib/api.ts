import axios, { AxiosError } from "axios";
import { AppError } from "~/utils/AppError";
import { STORAGE_KEYS } from "~/utils/constants";
import { storage } from "./storage";

const accessToken = storage.getString(STORAGE_KEYS.accessToken);

export const api = axios.create({
  baseURL: "http://192.168.1.32:3333",
  headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
});

api.interceptors.response.use(undefined, (error: AxiosError<any>) => {
  if (typeof error.response?.data.message === "string") {
    return Promise.reject(new AppError(error.response.data.message));
  }

  return Promise.reject(error);
});
