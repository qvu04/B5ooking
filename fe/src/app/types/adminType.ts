export interface TotalPayment {
    totalHotel: number;
    totalRevenueBooking: number;
    totalRoom: number;
    totalUser: number;
}
export interface UserManger {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    role: string;
}
export interface HotelManager {
    id: number;
    name: string;
    address: string;
    description: string;
    image: string;
    location: {
        id: number;
        city: string;
    }
}
export interface RoomManager {
    id: number;
    name: string;
    price: number;
    type: string;
    image: string;
    description: string;
    hotelId: number;
    hotel: {
        id: number;
        name: string;
    }
}
export interface HotelRevenue {
    hotelId: number;
    name: string;
    revenue: number;
    precent: number;
}