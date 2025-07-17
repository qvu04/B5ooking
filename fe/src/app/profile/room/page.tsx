"use client";

import { useEffect, useState } from "react";
import { getBookedRoom } from "@/app/api/bookingService";
import { BookedRoom } from "@/app/types/roomType";

export default function Room() {
    const [rooms, setRooms] = useState<BookedRoom[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookedRoom = async () => {
        try {
            const res = await getBookedRoom();
            console.log('✌️res --->', res);
            setRooms(res.data.data.bookings);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách phòng đã đặt:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookedRoom();
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Danh sách phòng đã đặt</h2>

            {loading ? (
                <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
            ) : rooms.length === 0 ? (
                <p className="text-center text-gray-500">Bạn chưa đặt phòng nào.</p>
            ) : (
                <div className="space-y-6">
                    {rooms.map((booking) => (
                        <div
                            key={booking.roomId}
                            className="border border-gray-200 rounded-xl p-4 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 bg-white"
                        >
                            {/* Ảnh phòng */}
                            <img
                                src={booking.room.image}
                                alt={booking.room.name}
                                className="w-full h-48 object-cover rounded-lg col-span-1"
                            />

                            {/* Thông tin phòng */}
                            <div className="col-span-2 space-y-2">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold">{booking.room.name}</h3>
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                                        {booking.status === "FINISHED" ? "Đã đặt" : booking.status}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-2">{booking.room.description}</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700">
                                    <p><strong>Nhận phòng:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
                                    <p><strong>Trả phòng:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
                                    <p><strong>Số đêm:</strong> {booking.nights}</p>
                                    <p><strong>Số khách:</strong> {booking.guests}</p>
                                    <p><strong>Giá/đêm:</strong> {booking.pricePerNight.toLocaleString()}₫</p>
                                    <p>
                                        <strong>Tổng tiền:</strong>{" "}
                                        <span className="text-red-600 font-semibold">
                                            {booking.totalPrice.toLocaleString()}₫
                                        </span>
                                    </p>
                                </div>

                                {/* Thông tin khách sạn */}
                                <div className="flex items-start gap-3 mt-3 border-t pt-3">
                                    <img
                                        src={booking.room.hotel.image}
                                        alt={booking.room.hotel.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="text-sm text-gray-700">
                                        <p className="font-medium">{booking.room.hotel.name}</p>
                                        <p>{booking.room.hotel.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
