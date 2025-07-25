export interface TotalPayment {
    totalHotel: number;
    totalRevenueBooking: number;
    totalRoom: number;
    totalUser: number;
}
export interface UserManger {
    id: number;
    firstName: string;
    lastName: string;
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
export interface BookingManger {
    id: number;
    room: {
        id: number;
        name: string;
        image: string;
        type: string;
    }
    guests: number;
    totalPrice: number
    status: string;
    checkIn: string;
    checkOut: string;
    user: {
        id: number;
        fullName: string;
    }
}
export interface HotelRevenue {
    hotelId: number;
    name: string;
    revenue: number;
    precent: number;
}
export interface PaymentRevenue {
    label: string;
    revenue: number;
}