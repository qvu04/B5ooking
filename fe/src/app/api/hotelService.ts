import { https } from "./configService"

export const getHotelsByLocation = (locationId: number) => {
    return https.get(`/api/hotel/getHotelsByLocation/${locationId}`);
}