import { LoginPayload, RegisterPayload } from "@/schemas";
import { apiConfig } from "./api"

export const authService = {
    register: async (payload: RegisterPayload) => {
        const res = await apiConfig.post("/auth/register", payload);
        return res.data;
    },
    login: async (payload: LoginPayload) => {
        const res = await apiConfig.post("/auth/login", payload);
        return res.data;
    }
};