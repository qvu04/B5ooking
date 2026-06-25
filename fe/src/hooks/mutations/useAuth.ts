import { LoginPayload, RegisterPayload } from "@/schemas";
import { authService } from "@/services"
import { useMutation } from "@tanstack/react-query"
export const useRegister = () => {
    return useMutation({
        mutationFn: async (payload: RegisterPayload) => await authService.register(payload),
    });
};
export const useLogin = () => {
    return useMutation({
        mutationFn: async (payload: LoginPayload) => await authService.login(payload),
    });
};