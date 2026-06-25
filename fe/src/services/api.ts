import axios from "axios";

export const apiConfig = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
});
apiConfig.interceptors.request.use((config) => {
    if (typeof window !== undefined) {
        const raw = localStorage.getItem("user");
        if (raw) {
            const { token_access } = JSON.parse("user");
            if (token_access) {
                config.headers.Authorization = `Bearer ${token_access}`
            }
        }
    }
    return config
});
apiConfig.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("user");
            window.localStorage.href = "/login"
        };
        return Promise.reject(error)
    },
);