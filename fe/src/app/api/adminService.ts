import { https } from "./configService";
import { BookingStatusEnum } from '@/app/types/bookingType';

// biểu đồ cột
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
// biểu đồ hình tròn
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
export const getAllHotelService = (page: number, locationId: number, hotelName: string) => {
    return https.get(`/api/admin/getAllHotels?locationId=${locationId}&page=${page}&hotelName=${hotelName}`);
}
export const postCreateHotelService = (data: FormData) => {
    return https.post("/api/admin/createHotel", data)
}
export const putUpdateHotelService = (hotelId: number, data: FormData) => {
    return https.put(`/api/admin/updateHotel/${hotelId}`, data)
}
export const deleteHotelService = (hotelId: number) => {
    return https.delete(`/api/admin/deleteHotel/${hotelId}`);
}
export const getAllAmenitiesService = () => {
    return https.get("/api/admin/getAllAmenities");
}
//quản lý chỗ ở
export const getAllRoomService = (page: number, hotelId: number, roomName: string) => {
    return https.get(`/api/admin/getAllRooms?hotelId=${hotelId}&page=${page}&roomName=${roomName}`);
}
export const postCreateRoomService = (data: FormData) => {
    return https.post("/api/admin/createRoom", data);
}
export const putUpdateRoomService = (roomId: number, data: FormData) => {
    return https.put(`/api/admin/updateRoom/${roomId}`, data);
}
export const deleteRoomService = (roomId: number) => {
    return https.delete(`/api/admin/deleteRoom/${roomId}`)
}
// quản lý booking
export const getAllBookingService = (page: number, status?: BookingStatusEnum | "ALL") => {
    const statusParam = status && status !== "ALL" ? `&status=${status}` : "";
    return https.get(`/api/admin/getAllBooking?page=${page}${statusParam}`);
}
// quản lý blog
export const getAllBlogService = (page: number, locationId: number, blogTitle: string) => {
    return https.get(`/api/admin/getAllBlogs?locationId=${locationId}&page=${page}&blogTitle=${blogTitle}`);
}
export const postCreateBlogService = (data: FormData) => {
    return https.post(`/api/admin/createBlog`, data)
}
export const putUpdateBlogService = (blogId: number, data: FormData) => {
    return https.put(`/api/admin/updateBlog/${blogId}`, data);
}
export const deleteBlogService = (blogId: number) => {
    return https.delete(`/api/admin/deleteBlog/${blogId}`);
}
// quản lý ảnh phụ

// quản lý ảnh khách sạn
export const getAllImagesHotel = (hotelId?: number | null, page: number = 1) => {
    const params: any = { page };

    if (hotelId !== null && hotelId !== undefined) {
        params.hotelId = hotelId;
    }

    return https.get(`/api/admin/getHotelImages`, { params });
};
export const postCreateImagesHotel = (hotelId: number, data: FormData) => {
    return https.post(`/api/admin/addHotelImage/${hotelId}`, data)
}
export const putUpdateImagesHotel = (hotelId: number, data: FormData) => {
    return https.put(`/api/admin/updateHotelImage/${hotelId}`, data)
}
export const deleteImagesHotel = (hotelId: number) => {
    return https.delete(`/api/admin/deleteHotelImage/${hotelId}`)
}
// quản lý ảnh phòng
export const getAllImagesRoom = (roomId?: number | null, page: number = 1) => {
    const params: any = { page };

    if (roomId !== null && roomId !== undefined) {
        params.roomId = roomId;
    }

    return https.get(`/api/admin/getRoomImages`, { params });
};
export const postCreateImagesRoom = (roomId: number, data: FormData) => {
    return https.post(`/api/admin/addRoomImage/${roomId}`, data)
}
export const putUpdateImagesRoom = (roomId: number, data: FormData) => {
    return https.put(`/api/admin/updateRoomImage/${roomId}`, data)
}
export const deleteImagesRoom = (roomId: number) => {
    return https.delete(`/api/admin/deleteRoomImage/${roomId}`)
}