"use client";
import { useEffect, useState } from "react";
import { getAllBookingService } from "@/app/api/adminService";
import { BookingStatusEnum } from "@/app/types/bookingType";
import { BookingManger } from "@/app/types/adminType";
import { Pagination } from "@/app/types/blogType";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

export default function BookingsManager() {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState<BookingStatusEnum | "ALL">("ALL");
    const [booking, setBooking] = useState<BookingManger[]>([]);
    const [pagination, setPagination] = useState<Pagination>();

    const fetchAllBooking = async () => {
        try {
            const res = await getAllBookingService(page, status);
            setBooking(res.data.data.bookings);
            setPagination(res.data.data.pagination);
            console.log("✌️res --->", res);
        } catch (error) {
            console.log("✌️error --->", error);
        }
    };

    useEffect(() => {
        fetchAllBooking();
    }, [page, status]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Quản lý phòng đã đặt</h2>

            {/* Thanh lọc trạng thái */}
            <div className="mb-6">
                <Select
                    value={status}
                    onValueChange={(value) => {
                        setPage(1); // reset về page đầu tiên khi lọc
                        setStatus(value as BookingStatusEnum | "ALL");
                    }}
                >
                    <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Lọc theo trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">Tất cả</SelectItem>
                        <SelectItem value="PENDING">Đang chờ</SelectItem>
                        <SelectItem value="CONFIRMED">Đã xác nhận</SelectItem>
                        <SelectItem value="CANCELED">Đã hủy</SelectItem>
                        <SelectItem value="FINISHED">Hoàn tất</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table danh sách phòng đã đặt */}
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100 text-center">
                        <th className="p-5 border">Ảnh phòng</th>
                        <th className="p-5 border">Tên phòng</th>
                        <th className="p-5 border">Giá</th>
                        <th className="p-5 border">Loại phòng</th>
                        <th className="p-5 border">Số lượng khách</th>
                        <th className="p-5 border">Tên người đặt</th>
                        <th className="p-5 border">Check in</th>
                        <th className="p-5 border">Check out</th>
                        <th className="p-5 border">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {booking.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="p-10 border">
                                <img
                                    src={booking.room.image}
                                    alt={booking.room.name}
                                    className="w-40 h-28 object-cover rounded-md shadow"
                                />
                            </td>
                            <td className="p-5 border">{booking.room.name}</td>
                            <td className="p-5 border">{booking.totalPrice}</td>
                            <td className="p-5 border truncate max-w-[200px]">{booking.room.type}</td>
                            <td className="p-5 border">{booking.guests}</td>
                            <td className="p-5 border">{booking.user.fullName}</td>
                            <td className="p-5 border">
                                {new Date(booking.checkIn).toLocaleDateString('vi-VN')}
                            </td>
                            <td className="p-5 border">
                                {new Date(booking.checkOut).toLocaleDateString('vi-VN')}
                            </td>
                            <td className="p-5 border">{booking.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            {pagination && (
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className="px-4 py-2 bg-[#7f5af0] text-white rounded disabled:opacity-50"
                    >
                        Trang trước
                    </button>
                    <span>
                        Trang {pagination.page} / {pagination.totalPages}
                    </span>
                    <button
                        disabled={page === pagination.totalPages}
                        onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
                        className="px-4 py-2 bg-[#7f5af0] text-white rounded disabled:opacity-50"
                    >
                        Trang sau
                    </button>
                </div>
            )}
        </div>
    );
}
