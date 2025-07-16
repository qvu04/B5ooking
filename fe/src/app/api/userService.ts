import { https } from "./configService"

export const updateUserService = (data: any) => {
    return https.patch("/api/user/update-profile", data);
}