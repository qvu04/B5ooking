import { store } from "@/lib/store";
import { hideLoading, showLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const https = axios.create({
  baseURL: apiUrl,
})
https.interceptors.request.use(
  (config) => {
    // Check nếu request có config.noLoading === true thì không show loading
    if (!config.noLoading) {
      store.dispatch(showLoading());
    }

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

// Interceptor response
https.interceptors.response.use(
  (response) => {
    if (!response.config.noLoading) {
      setTimeout(() => store.dispatch(hideLoading()), 1000);
    }
    return response;
  },
  (error) => {
    if (!error.config?.noLoading) {
      store.dispatch(hideLoading());
    }
    return Promise.reject(error);
  }
);

