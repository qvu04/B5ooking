import { store } from "@/lib/store";
import { hideLoading, showLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const https = axios.create({
  baseURL: apiUrl,
})
https.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const userJson = localStorage.getItem("user");
      if (userJson) {
        const userInfo = JSON.parse(userJson);
        const token = userInfo?.token_access;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
https.interceptors.request.use(
  (config) => {
    store.dispatch(showLoading());
    return config;
  },
  (error) => Promise.reject(error)
);

https.interceptors.response.use(
  (response) => {
    setTimeout(() => store.dispatch(hideLoading()), 1000);
    return response;
  },
  (error) => {
    store.dispatch(hideLoading());
    return Promise.reject(error);
  }
);
