"use client";

import { useEffect, useState } from "react";
import { deleteBookingRoom, getBookingByStatus } from "@/app/api/bookingService";
import { BookingItem, BookingStatusEnum } from "@/app/types/bookingType";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

export default function Booking() {
    const [bookings, setBookings] = useState<BookingItem[]>([]);
    const [filteredStatus, setFilteredStatus] = useState<BookingStatusEnum | "ALL">("ALL");
    const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const fetchBookings = async () => {
        try {
            const [resPending, resConfirmed, resCanceled] = await Promise.all([
                getBookingByStatus(BookingStatusEnum.PENDING),
                getBookingByStatus(BookingStatusEnum.CONFIRMED),
                getBookingByStatus(BookingStatusEnum.CANCELED),
            ]);

            const allBookings = [
                ...resPending.data.data.bookings,
                ...resConfirmed.data.data.bookings,
                ...resCanceled.data.data.bookings,
            ];
            setBookings(allBookings);
        } catch (err) {
            console.error("Lỗi lấy booking:", err);
        }
    };

    const handleOpenCancelDialog = (id: number) => {
        setSelectedBookingId(id);
        setIsOpen(true);
    };

    const confirmCancelBooking = async () => {
        if (!selectedBookingId) return;

        try {
            await deleteBookingRoom(selectedBookingId);
            setBookings(prev => prev.filter(b => b.id !== selectedBookingId));
            setIsOpen(false);
            toast.success("Huỷ đặt phòng thành công.");
            fetchBookings();
        } catch (err) {
            console.error("Lỗi khi huỷ đặt phòng:", err);
            toast.error("Huỷ đặt phòng thất bại.");
        }
    };

    const filteredBookings = filteredStatus === "ALL"
        ? bookings
        : bookings.filter(b => b.status === filteredStatus);
    useEffect(() => {
        fetchBookings();
    }, [])
    const renderBookingList = () => (
        <section className="mt-6">
            {filteredBookings.length === 0 ? (
                <p className="text-gray-600 italic">Không có đơn đặt nào.</p>
            ) : (
                <ul className="space-y-6">
                    {filteredBookings.map((item) => (
                        <li key={item.id} className="p-5 border rounded-xl shadow-md flex gap-4">
                            <img
                                src={item.room.image}
                                alt={item.room.name}
                                className="w-36 h-28 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <p className="text-xl font-bold text-[#333]">{item.room.hotel.name}</p>
                                <p className="text-lg font-semibold text-[#6246ea]">{item.room.name}</p>
                                <div className="mt-1 text-sm text-gray-600">
                                    <p>Thời gian: {new Date(item.checkIn).toLocaleDateString()} - {new Date(item.checkOut).toLocaleDateString()}</p>
                                    <p>Khách: {item.guests} | Đêm: {item.nights}</p>
                                </div>
                                <p className="mt-2 text-base font-medium text-[#111]">
                                    Tổng tiền:{" "}
                                    <span className="text-[#f43f5e] font-bold">
                                        {item.totalPrice.toLocaleString()}₫
                                    </span>
                                </p>
                                <span className="inline-block mt-2 text-sm px-3 py-1 rounded-full bg-gray-100 border text-[#6246ea] font-semibold">
                                    Trạng thái: {
                                        item.status === "PENDING"
                                            ? "Chờ xác nhận"
                                            : item.status === "CONFIRMED"
                                                ? "Đã xác nhận"
                                                : item.status === "CANCELED"
                                                    ? "Đã huỷ"
                                                    : item.status
                                    }
                                </span>

                                {/* 👇 Thêm phần này nếu trạng thái là PENDING */}
                                {item.status === BookingStatusEnum.PENDING && (
                                    <div className="mt-4 flex gap-3">
                                        <button
                                            // onClick={() => handlePayment(item.id)}
                                            className="px-4 py-2 cursor-pointer rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition"
                                        >
                                            Thanh toán
                                        </button>
                                        <button
                                            onClick={() => handleOpenCancelDialog(item.id)}
                                            className="px-4 py-2 cursor-pointer rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                                        >
                                            Huỷ đặt phòng
                                        </button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );


    const renderFilterButtons = () => (
        <div className="flex flex-wrap gap-3 mb-6">
            {[
                { label: "Tất cả", value: "ALL" },
                { label: "Chờ xác nhận", value: BookingStatusEnum.PENDING },
                { label: "Đã xác nhận", value: BookingStatusEnum.CONFIRMED },
                { label: "Đã huỷ", value: BookingStatusEnum.CANCELED }
            ].map(({ label, value }) => (
                <button
                    key={value}
                    onClick={() => setFilteredStatus(value as BookingStatusEnum | "ALL")}
                    className={`px-4 py-2 shadow-sm rounded-full text-sm font-medium transition ${filteredStatus === value
                        ? "bg-[#6246ea] text-white"
                        : "bg-white text-[#6246ea] border border-[#6246ea]"
                        } hover:bg-[#6246ea] hover:text-white`}
                >
                    {label}
                </button>
            ))}
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto mt-6 px-4">
            <h1 className="text-3xl font-bold mb-6 text-[#222]">Lịch sử đặt phòng</h1>
            {renderFilterButtons()}
            {renderBookingList()}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Bạn có chắc muốn huỷ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Hành động này không thể hoàn tác. Đơn đặt phòng sẽ bị huỷ vĩnh viễn.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Đóng</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmCancelBooking}>
                            Đồng ý huỷ
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
