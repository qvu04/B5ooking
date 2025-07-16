import { https } from "./configService";
import { BookingItem, BookingStatusEnum } from "../types/bookingType";

// 👇 Đây là kiểu thực tế từ API bạn đã log ra
interface BookingApiResponse {
    status: number;
    message: string;
    data: {
        bookings: BookingItem[];
    };
}

export const getBookingByStatus = (status: BookingStatusEnum) => {
    return https.get<BookingApiResponse>(`/api/user/getBookingByStatus`, {
        params: { status },
    });
};
