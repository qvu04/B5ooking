import { apiConfig } from "./api"

export const locationService = {
    getLocationList: async () => {
        const res = await apiConfig.get("/hotel/getAllLocations");
        return res;
    }
}