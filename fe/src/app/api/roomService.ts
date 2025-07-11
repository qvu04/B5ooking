import { RoomAvailable } from "../types/hotelTypes";
import { https } from "./configService"

type SearchHotelParams = {
    hotelId: number;
    checkIn: string;
    checkOut: string;
    guests: number;
};

export const getSearchHotel = (params: SearchHotelParams) => {
    return https.get<{ data: { availableRooms: RoomAvailable[] } }>("/api/room/getSearchAvailableHotels", {
        params,
    });
};
export const fetchSearchHotel = async (params: SearchHotelParams) => {
    const res = await getSearchHotel(params)
    const rooms = res.data.data.availableRooms;
    console.log("✌️rooms --->", res.data);
    return rooms
}
export const getRoomByRoomId = (roomId: number) => {
    return https.get(`/api/room/getRoomById/${roomId}`)
}