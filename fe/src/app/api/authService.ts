import { LoginUser, RegisterUser } from "../types/authType";
import { https } from "./configService"

export const loginService = (user: LoginUser) => {
    return https.post("/api/auth/login", user);
}
export const registerService = (user: RegisterUser) => {
    return https.post("/api/auth/register", user);
}
export const loginGoogleService = (code: string) => {
    return https.post("/api/auth/google-login", { code });
}