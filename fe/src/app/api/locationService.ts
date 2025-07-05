import { https } from "./configService"

export const getSomeLocation = () => {
    return https.get("/api/hotel/getSomeLocaltions");
}