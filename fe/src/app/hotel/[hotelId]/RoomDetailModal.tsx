'use client';

import { Modal } from 'antd';
import { RoomAvailable } from '@/app/types/hotelTypes';
import { AiOutlineCheck } from 'react-icons/ai';
import { getRoomByRoomId } from '@/app/api/roomService';
import { useEffect, useState } from 'react';
import { RoomType } from '@/app/types/roomType';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/thumbs';
import { postBookingRoom } from '@/app/api/bookingService';
import toast from 'react-hot-toast';
import ShowConfirm from '@/app/hotel/[hotelId]/FormConfirmBooking';

type Props = {
    open: boolean;
    onClose: () => void;
    room: RoomAvailable | null;
    checkIn: string;
    checkOut: string;
};

export default function RoomDetailModal({ open, onClose, room, checkIn, checkOut }: Props) {
    console.log('✌️checkOut --->', checkOut);
    console.log('✌️checkIn --->', checkIn);
    const [fullRoom, setFullRoom] = useState<RoomType | null>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [isBooking, setIsBooking] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const handleBooking = async (nights: number, checkInDate: string, checkOutDate: string) => {
        if (!room) return
        setIsBooking(true);
        try {
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            const payload = {
                roomId: room.id,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                guests: 2,
            }
            const res = await postBookingRoom(payload);
            setShowConfirm(false);
            onClose();
        } catch (error) {
            console.log('✌️error --->', error);
            toast.error("Đặt phòng thất bại");
        } finally {
            setIsBooking(false);
        }
    }
    useEffect(() => {
        if (!room || !open) return;

        const fetchRoomDetail = async () => {
            try {
                const res = await getRoomByRoomId(room.id);
                console.log('✌️res --->', res);
                setFullRoom(res.data.data.room);
            } catch (error) {
                console.error('❌ Lỗi khi lấy chi tiết phòng:', error);
            }
        };
        fetchRoomDetail();
    }, [room, open]);

    if (!room || !fullRoom) return null;

    const discountedPrice = room.discount
        ? room.price * (1 - room.discount / 100)
        : room.price;
    const handleConfirmBooking = () => {
        setShowConfirm(true);
    };
    return (
        <Modal open={open} onCancel={onClose} footer={null} width={1000}>
            <div className="grid md:grid-cols-2 gap-6">
                {/* BÊN TRÁI: Hình ảnh */}
                <div className="space-y-4">
                    {/* Swiper ảnh chính */}
                    <Swiper
                        modules={[Thumbs]}
                        thumbs={{ swiper: thumbsSwiper }}
                        loop={true}
                        spaceBetween={10}
                        className="rounded-lg overflow-hidden mb-2 h-[300px]"
                    >
                        <SwiperSlide>
                            <img
                                src={fullRoom.image}
                                alt="main-room"
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                        {Array.isArray(fullRoom.images) &&
                            fullRoom.images.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <img
                                        src={img.imageUrl}
                                        alt={`room-${i}`}
                                        className="w-full h-full object-cover"
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>

                    {/* Swiper thumbnail */}
                    <Swiper
                        modules={[Thumbs]}
                        onSwiper={setThumbsSwiper}
                        slidesPerView={5}
                        spaceBetween={10}
                        watchSlidesProgress
                        className="h-20"
                    >
                        <SwiperSlide>
                            <img
                                src={fullRoom.image}
                                alt="thumb-main"
                                className="w-full h-full object-cover rounded border"
                            />
                        </SwiperSlide>
                        {Array.isArray(fullRoom.images) &&
                            fullRoom.images.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <img
                                        src={img.imageUrl}
                                        alt={`thumb-${i}`}
                                        className="w-full h-full object-cover rounded border"
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>

                {/* BÊN PHẢI: Thông tin */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-purple-700">{fullRoom.name}</h2>
                        <p className="text-gray-600 text-sm">
                            1 giường đôi • Tối đa {fullRoom.maxGuests} khách
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm border">
                        <h3 className="font-semibold text-lg mb-2 text-gray-800">Mô tả:</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">{fullRoom.description}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">Tiện nghi:</h3>
                        <ul className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
                            {room.amenities.map((item, i) => (
                                <li key={i} className="flex items-center gap-1">
                                    <AiOutlineCheck className="text-green-500" />
                                    {item.amenity.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">Trong phòng tắm:</h3>
                        <ul className="list-disc grid grid-cols-2 list-inside text-sm text-gray-700 leading-relaxed space-y-1">
                            <li>Đồ vệ sinh cá nhân miễn phí</li>
                            <li>Áo choàng tắm</li>
                            <li>Chậu rửa vệ sinh (bidet)</li>
                            <li>Nhà vệ sinh</li>
                            <li>Bồn tắm hoặc Vòi sen</li>
                            <li>Khăn tắm</li>
                            <li>Dép</li>
                            <li>Máy sấy tóc</li>
                            <li>Toilet phụ</li>
                            <li>Khăn tắm/Bộ khăn trải giường (có thu phí)</li>
                            <li>Giấy vệ sinh</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">Hướng tầm nhìn:</h3>
                        <p className="text-sm text-gray-700">Nhìn ra thành phố</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">Giá:</h3>
                        {room.discount > 0 ? (
                            <div>
                                <p className="text-gray-500 line-through">{room.price.toLocaleString()} VND</p>
                                <p className="text-green-600">Giảm {room.discount}%</p>
                                <p className="text-pink-600 font-bold text-lg">
                                    {discountedPrice.toLocaleString()} VND
                                </p>
                            </div>
                        ) : (
                            <p className="text-pink-600 font-bold text-lg">
                                {room.price.toLocaleString()} VND
                            </p>
                        )}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">Ưu đãi:</h3>
                        <ul className="text-sm space-y-1">
                            <li>✅ Hủy miễn phí trước 18:00, 7 tháng 7, 2025</li>
                            <li>✅ Thanh toán tại nơi nghỉ</li>
                            <li>✅ Không cần thẻ tín dụng</li>
                            <li>✅ Giảm giá đặc biệt</li>
                        </ul>
                    </div>

                    <button
                        onClick={handleConfirmBooking}
                        disabled={isBooking}
                        className="w-full bg-purple-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                    >
                        {isBooking ? "Đang xử lý..." : "Đặt Phòng Ngay"}
                    </button>
                    <ShowConfirm
                        visible={showConfirm}
                        onCancel={() => setShowConfirm(false)}
                        onConfirm={(nights, checkInDate, checkOutDate) => {
                            handleBooking(nights, checkInDate, checkOutDate);
                            // Gửi API ở đây nếu cần
                            // Bạn có thể gọi lại handleBooking(checkIn, checkOut)
                            toast.success(`Đặt phòng thành công!`);
                            setShowConfirm(false);
                        }}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        guests={room.maxGuests}
                        pricePerNight={room.price}
                        discount={room.discount}
                    />
                </div>
            </div>
        </Modal>
    );


}
