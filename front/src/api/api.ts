import axios from "axios";
import { STORAGE_KEY } from "../storage/const/storage.const";
import { LocalStorageService } from "../storage/services/storage.service";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const storage = LocalStorageService.getInstance();

apiClient.interceptors.request.use(
  (config) => {
    const token = storage.get(STORAGE_KEY.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      storage.remove(STORAGE_KEY.TOKEN);
    }
    if (error.response && error.response.status === 500) {
      console.error("서버 에러가 발생했습니다.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
