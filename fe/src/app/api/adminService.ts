import { https } from "./configService";
import { BookingStatusEnum } from '@/app/types/bookingType';

export const getRevenueChartService = (type: "day" | "week" | "month") => {
    const now = new Date();
    const toDate = now.toISOString();
    let fromDate;

    if (type === 'day') {
        // Lấy 7 ngày gần nhất
        const past = new Date();
        past.setDate(now.getDate() - 7);
        fromDate = past.toISOString();
    } else if (type === 'week') {
        // Lấy 4 tuần gần nhất (28 ngày)
        const past = new Date();
        past.setDate(now.getDate() - 28);
        fromDate = past.toISOString();
    } else {
        // Lấy 6 tháng gần nhất
        const past = new Date();
        past.setMonth(now.getMonth() - 6);
        fromDate = past.toISOString();
    }

    return https.get(`/api/dashboard/getGroupedRevenue?type=${type}&fromDate=${fromDate}&toDate=${toDate}`);
};
export const getRevenuePieChart = (type: "day" | "week" | "month") => {
    const now = new Date();
    const toDate = now.toISOString();
    let fromDate;

    if (type === 'day') {
        const past = new Date();
        past.setDate(now.getDate() - 7);
        fromDate = past.toISOString();
    } else if (type === 'week') {
        const past = new Date();
        past.setDate(now.getDate() - 28);
        fromDate = past.toISOString();
    } else {
        const past = new Date();
        past.setMonth(now.getMonth() - 6);
        fromDate = past.toISOString();
    }

    return https.get(`/api/dashboard/getHotelRevenuePercentage?fromDate=${fromDate}&toDate=${toDate}`);
};
export const getTotalService = () => {
    return https.get("/api/dashboard/getTotal");
}
// quản lý người dùng
export const getAllUserService = (page: number, fullName: string = '') => {
    return https.get(`/api/admin/getAllUsers?page=${page}&fullName=${fullName}`)
}
export const postCreateUserService = (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    gender: string;
}) => {
    return https.post("/api/admin/createUser", data);
}
export const putUpdateUSerService = (id: number, data: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    gender: string;
}) => {
    return https.put(`/api/admin/updateUser/${id}`, data);
}
export const deleteUserService = (id: number) => {
    return https.delete(`/api/admin/deleteUser/${id}`);
}
// quản lý khách sạn
export const getAllHotelService = (page: number, locationId: number) => {
    return https.get(`/api/admin/getAllHotels?locationId=${locationId}&page=${page}`);
}
//quản lý chỗ ở
export const getAllRoomService = (page: number, hotelId: number) => {
    return https.get(`/api/admin/getAllRooms?hotelId=${hotelId}&page=${page}`);
}
// quản lý booking
export const getAllBookingService = (page: number, status?: BookingStatusEnum | "ALL") => {
    const statusParam = status && status !== "ALL" ? `&status=${status}` : "";
    return https.get(`/api/admin/getAllBooking?page=${page}${statusParam}`);
}