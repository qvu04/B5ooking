import { https } from "./configService"

export const getAllLocation = () => {
    return https.get("/api/hotel/getAllLocations");
}