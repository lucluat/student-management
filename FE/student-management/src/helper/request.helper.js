
import axios from "axios";
import { AppConfig } from "../AppConfig";
import { getToken } from "../helper/UserToken";

export const request = axios.create({
  baseURL: AppConfig.apiUrl,
});

request.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    // if (error.response.status === 404) {
    //   window.location.href = window.location.origin + "/404";
    //   return;
    // }
    // if (error.response.status === 401) {
    //   window.location.href = window.location.origin + "/401";
    //   return;
    // }
    // if (error.response.status === 403) {
    //   window.location.href = window.location.origin + "/403";
    //   return;
    // }
    return Promise.reject(error);
  }
);
