import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.32:3333",
});

api.interceptors.response.use(undefined, (error: AxiosError) => {});
