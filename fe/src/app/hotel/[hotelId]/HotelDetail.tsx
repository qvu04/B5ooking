'use client';
import { Hotels, RoomAvailable } from '@/app/types/hotelTypes';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import { Swiper as SwiperType } from 'swiper/types';
import { geocodeAddress } from '@/lib/geocode';
import { FiShare } from "react-icons/fi";
import { AiOutlineHeart, AiFillStar, AiOutlineCheckCircle, AiOutlineUser, AiOutlineCheck } from "react-icons/ai";
import type { RangePickerProps } from "antd/es/date-picker";
import Link from 'next/link';
import MapView from '@/app/components/Map/MapViewWrapper';
import { FaUserAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import toast from 'react-hot-toast';
import { postReviewHotel } from '@/app/api/hotelService';
import { ReviewType } from '@/app/types/reviewType';
import { fetchSearchHotel } from '@/app/api/roomService';
import { DatePicker } from "antd";
import dayjs from "dayjs";
import RoomDetailModal from './RoomDetailModal';
type Props = {
    hotel: Hotels;
};

export default function HotelDetailClient({ hotel }: Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState(hotel.reviews || []);
    const { user } = useSelector((state: RootState) => state.userSlice);
    const [mounted, setMounted] = useState(false);
    const [checkIn, setCheckIn] = useState<string>("");
    const [checkOut, setCheckOut] = useState<string>("");
    const [guests, setGuests] = useState<number>(1);
    const [availableRooms, setAvailableRooms] = useState<RoomAvailable[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<RoomAvailable | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (hotel.latitude && hotel.longitude) {
            setCoords({ lat: hotel.latitude, lng: hotel.longitude });
        } else {
            geocodeAddress(hotel.address).then((res) => {
                if (res) setCoords(res);
            });
        }
    }, [hotel]);
    const handleDateChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
        setCheckIn(dateStrings[0]);
        setCheckOut(dateStrings[1]);
    };
    const handleSearch = async () => {
        if (!checkIn || !checkOut || !guests) {
            toast.error("Vui lòng chọn đầy đủ thông tin tìm kiếm");
            return;
        }

        try {
            const rooms = await fetchSearchHotel({
                hotelId: hotel.id,
                checkIn,
                checkOut,
                guests,
            });
            setAvailableRooms(rooms);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm phòng:", error);
            toast.error("Không thể tìm kiếm phòng");
        }
    };
    useEffect(() => {
        if (!hotel.id) return;

        const fetchAvailableRooms = async () => {
            try {
                const rooms = await fetchSearchHotel({
                    hotelId: hotel.id,
                    checkIn: "2025-07-20",  // Hardcoded tạm
                    checkOut: "2025-07-22",
                    guests: 2,
                });
                setAvailableRooms(rooms);
            } catch (error) {
                console.error("Lỗi khi fetch phòng trống:", error);
            }
        };

        fetchAvailableRooms();
    }, [hotel.id]);
    const handlePostSubmitReview = async () => {
        try {
            if (!user) {
                toast.error("Vui lòng đăng nhập để đánh giá");
                return;
            }
            const res = await postReviewHotel(hotel.id, { rating, comment });
            const newReview: ReviewType = {
                comment,
                rating,
                user: {
                    avatar: user?.data?.User.avatar || '',
                    fullName: user?.data?.User.fullName || '',
                },
            };
            setReviews((prev: ReviewType[]) => [newReview, ...prev]);
            setRating(0);
            setComment("");
            toast.success("Gửi đánh giá thành công");

        } catch (error) {
            toast.error("Đánh giá thất bại. Vui lòng thử lại.");
            console.log('✌️error --->', error);

        }

    }
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleOpenRoomDetail = (room: RoomAvailable) => {
        setSelectedRoom(room);
        console.log('✌️room --->', room);
        setIsModalOpen(true);
    };
    const handleCloseRoomDetail = () => {
        setSelectedRoom(null);
        setIsModalOpen(false);
    };
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Tiêu đề */}
            <h1 className="text-2xl text-center md:text-3xl font-semibold mb-6 leading-snug">
                {hotel.name} - Cùng với những dịch vụ và phong cách phòng sang trọng
            </h1>

            {/* Layout hình ảnh + bản đồ */}
            <div className="grid md:grid-cols-3 gap-4">
                {/* Ảnh lớn + thumbnail */}
                <div className="col-span-2 space-y-4">
                    <div className="w-full h-[360px] rounded-lg overflow-hidden">
                        <Swiper
                            modules={[Autoplay, Thumbs]}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            loop={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            slidesPerView={1}
                            className="w-full h-full"
                        >
                            {hotel.images.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <img
                                        src={img.imageUrl}
                                        alt={`Slide ${i}`}
                                        className="w-full h-full object-cover"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            modules={[Thumbs]}
                            slidesPerView={5}
                            spaceBetween={10}
                            watchSlidesProgress
                            className="w-full h-20"
                        >
                            {hotel.images.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <img
                                        src={img.imageUrl}
                                        alt={`Thumbnail ${i}`}
                                        className="w-full h-full object-cover rounded-md border"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                {/* Bản đồ */}
                <div className="h-[460px] w-full">
                    {coords && (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-medium mb-2">Vị trí trên bản đồ</h2>
                                <div className="flex items-center gap-6 text-gray-700">
                                    <button className="flex items-center gap-1 cursor-pointer">
                                        <FiShare size={20} />
                                        <span>Chia sẻ</span>
                                    </button>

                                    <button className="flex items-center gap-1 cursor-pointer">
                                        <AiOutlineHeart className="text-gray-600 hover:text-red-500 transition-colors duration-300" size={20} />
                                        <span>Lưu</span>
                                    </button>
                                </div>
                            </div>
                            <MapView lat={coords.lat} lng={coords.lng} name={hotel.name} />
                        </>
                    )}
                </div>
            </div>
            {/* Mô tả */}
            <div>
                <div className='mt-5'>
                    <h2 className='font-bold text-2xl '>Địa chỉ - {hotel.address}</h2>
                    <p className='pt-3'>
                        2 khách,
                        1 phòng ngủ,
                        1 giường,
                        1 phòng tắm
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                        <div className="flex items-center gap-1 text-yellow-400">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <AiFillStar
                                    key={index}
                                    className={
                                        index < Math.round(hotel.averageRating || hotel.defaultRating)
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                    }
                                    size={20}
                                />
                            ))}
                        </div>
                        <span className="text-gray-800 font-medium">
                            {(hotel.averageRating || hotel.defaultRating).toFixed(1)} / 5
                        </span>
                        <span className="text-gray-500">({hotel.reviewCount} đánh giá)</span>
                    </div>

                </div>
                <div className="mt-10 space-y-3">
                    <h2 className="text-xl font-semibold">Mô tả khách sạn</h2>
                    <p className="text-gray-700 whitespace-pre-line">{hotel.description}</p>
                </div>
                {/* Dịch vụ */}
                <div className="mt-10 space-y-6">
                    {/* 1 */}
                    <div className="flex items-start gap-4 border-b border-gray-200 pb-6">
                        <img src="/images/door.png" alt="check" className="w-10 h-10 object-contain" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Tự nhận phòng</h3>
                            <p className="text-gray-600">Tự nhận phòng với hộp khóa an toàn</p>
                        </div>
                    </div>

                    {/* 2 */}
                    <div className="flex items-start gap-4 border-b border-gray-200 pb-6">
                        <img src="/images/check_room.png" alt="check" className="w-10 h-10 object-contain" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Khu vực có cảnh đẹp</h3>
                            <p className="text-gray-600">Khách rất thích vị trí tuyệt đẹp của nhà này</p>
                        </div>
                    </div>

                    {/* 3 */}
                    <div className="flex items-start gap-4">
                        <img src="/images/star.png" alt="check" className="w-10 h-10 object-contain" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Chủ nhà siêu cấp</h3>
                            <p className="text-gray-600">Chủ nhà dày dặn kinh nghiệm, được đánh giá cao</p>
                        </div>
                    </div>
                </div>
                {/* Tiện nghi */}
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-4">Tiện nghi nổi bật</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {hotel.amenities.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-gray-700"
                            >
                                <AiOutlineCheckCircle className="text-green-500" size={20} />
                                <span>{item.amenity.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Các phòng trống */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-6">Tất cả các phòng còn trống</h2>
                    {/* Thanh tìm kiếm phòng trống */}
                    <div className="mt-4 border border-gray-200 p-6 rounded-lg shadow-sm space-y-4">
                        <h3 className="text-xl font-semibold mb-2">Tìm kiếm phòng trống</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Chọn ngày */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Chọn ngày</label>
                                <DatePicker.RangePicker
                                    format="YYYY-MM-DD"
                                    onChange={handleDateChange}
                                    className="w-full"
                                    disabledDate={(current) => current && current < dayjs().startOf("day")}
                                />
                            </div>

                            {/* Số lượng khách */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Số lượng khách</label>
                                <input
                                    type="number"
                                    min={1}
                                    value={guests}
                                    onChange={(e) => setGuests(parseInt(e.target.value))}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                            </div>

                            {/* Nút tìm kiếm */}
                            <div className="flex items-end">
                                <button
                                    onClick={handleSearch}
                                    className="w-full bg-purple-600 cursor-pointer hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-semibold"
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                    </div>
                    {availableRooms.length > 0 ? (
                        <table className="w-full border border-black table-fixed">
                            <thead>
                                <tr className="bg-[#d1d1e9] text-left">
                                    <th className="w-[30%] border-r border-black p-4 font-semibold text-lg">Loại phòng</th>
                                    <th className="w-[10%] border-r border-black p-4 font-semibold text-lg text-center">Lượng khách</th>
                                    <th className="w-[15%] border-r border-black p-4 font-semibold text-lg text-center">Giá hôm nay</th>
                                    <th className="w-[45%] p-4 font-semibold text-lg text-center">Các ưu đãi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {availableRooms.map((room, index) => (
                                    <tr key={index} className="border-t border-black">
                                        {/* Cột loại phòng */}
                                        <td className="align-top border-r border-black p-4">
                                            <button
                                                className="font-bold hover:text-[#6246ea] cursor-pointer text-lg"
                                                onClick={() => handleOpenRoomDetail(room)}
                                            >{room.name}</button>
                                            <p className="text-red-500 text-sm mt-1">chỉ còn 1 phòng trên trang chúng tôi</p>
                                            <p className="mt-2">1 giường đôi 🛏️</p>
                                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-gray-700">
                                                {room.amenities.map((item, i) => (
                                                    <div key={i} className="flex items-center gap-1">
                                                        <AiOutlineCheck className="text-green-500" size={14} />
                                                        <span>{item.amenity.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>

                                        {/* Cột lượng khách */}
                                        <td className="align-top border-r border-black p-4 text-center">
                                            <div className="flex justify-center gap-1 mt-2">
                                                {Array.from({ length: room.maxGuests }).map((_, i) => (
                                                    <AiOutlineUser key={i} size={18} />
                                                ))}
                                            </div>
                                        </td>

                                        {/* Cột giá */}
                                        <td className="align-top border-r border-black p-4 text-center">
                                            {room.discount > 0 ? (
                                                <div className="mt-2 space-y-1">
                                                    <p className="text-gray-400 line-through text-sm">
                                                        {room.price.toLocaleString()} VND
                                                    </p>
                                                    <p className="text-green-600 text-xs font-medium">
                                                        Giảm {room.discount}%
                                                    </p>
                                                    <p className="text-pink-600 text-lg font-semibold">
                                                        {(room.price * (1 - room.discount / 100)).toLocaleString()} VND
                                                    </p>
                                                </div>
                                            ) : (
                                                <p className="text-pink-600 text-lg font-semibold mt-2">
                                                    {room.price.toLocaleString()} VND
                                                </p>
                                            )}
                                        </td>

                                        {/* Cột ưu đãi */}
                                        <td className="align-top p-4 space-y-2">
                                            <ul className="text-sm text-gray-700 space-y-1">
                                                <li className="flex items-start gap-2">
                                                    <AiOutlineCheck className="text-green-500 mt-1" size={16} />
                                                    <span>Hủy miễn phí trước 18:00, 7 tháng 7, 2025</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <AiOutlineCheck className="text-green-500 mt-1" size={16} />
                                                    <span>Không cần thanh toán trước - thanh toán tại chỗ nghỉ</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <AiOutlineCheck className="text-green-500 mt-1" size={16} />
                                                    <span>Không cần thẻ tín dụng</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <AiOutlineCheck className="text-green-500 mt-1" size={16} />
                                                    <span><strong>Giảm giá 10%</strong> trên giá trước thuế và phí</span>
                                                </li>
                                            </ul>
                                            <button className="mt-4 bg-purple-500 cursor-pointer hover:bg-purple-600 text-white px-6 py-2 rounded-full font-semibold">
                                                Đặt Phòng
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center mt-6 text-red-500 font-medium text-base">
                            Hiện tại không có phòng theo ngày này và lượng khách không phù hợp.<br />
                            Vui lòng giảm số lượng khách hoặc chọn ngày phù hợp hơn.
                        </div>
                    )}

                </div>
                {/* Comment */}
                {/* Đánh giá của khách hàng */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Đánh giá của khách hàng</h2>

                    {/* Tổng quan rating */}
                    <div className="space-y-3 mb-8">
                        {([5, 4, 3, 2, 1] as const).map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <span className="w-10 text-sm font-medium">{i} sao</span>
                                <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
                                    <div
                                        className="bg-yellow-400 h-full"
                                        style={{ width: `${hotel.ratingStats.percentages[i]}%` }}
                                    />
                                </div>
                                <span className="text-sm text-gray-500 w-20 text-right">
                                    {hotel.ratingStats.count[i]} đánh giá
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Danh sách bình luận với Show More */}
                    <div className="grid gap-6">
                        {(showAllReviews ? reviews : reviews.slice(0, 2)).map((review, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md p-5 border border-gray-200"
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    {review.user?.avatar ? (
                                        <img
                                            src={review.user.avatar}
                                            alt="avatar"
                                            className="w-12 h-12 rounded-full object-cover border"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white">
                                            <FaUserAlt className="text-sm" />
                                        </div>
                                    )}

                                    <div>
                                        <p className="font-semibold text-gray-900">{review.user?.fullName}</p>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <AiFillStar
                                                    key={i}
                                                    size={16}
                                                    className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-sm">{review.comment}</p>
                            </div>
                        ))}
                    </div>

                    {/* Nút hiển thị thêm */}
                    {hotel.reviews.length > 2 && (
                        <div className="mt-6 text-center">
                            <button
                                className="text-purple-600 cursor-pointer hover:underline font-medium text-sm"
                                onClick={() => setShowAllReviews(!showAllReviews)}
                            >
                                {showAllReviews ? "Ẩn bớt" : "Hiển thị thêm"}
                            </button>
                        </div>
                    )}
                </div>
                {/* Post bình luận */}
                {/* Gửi đánh giá */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Gửi đánh giá của bạn</h2>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
                        {/* Avatar + Tên + Chọn sao */}
                        {mounted && (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    {user?.data?.User?.avatar ? (
                                        <img
                                            src={user.data.User.avatar}
                                            alt="Avatar"
                                            className="w-12 h-12 rounded-full object-cover shadow-md"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white shadow-md">
                                            <FaUserAlt className="text-base" />
                                        </div>
                                    )}
                                    <p className="font-semibold text-lg text-gray-800">
                                        {user?.data?.User?.fullName}
                                    </p>
                                </div>

                                <div className="flex gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <AiFillStar
                                            key={i}
                                            size={24}
                                            onClick={() => setRating(i + 1)}
                                            className={`cursor-pointer transition-all duration-150 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Textarea */}
                        <textarea
                            placeholder="Chia sẻ trải nghiệm của bạn tại khách sạn..."
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-4 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                        ></textarea>

                        {/* Nút gửi */}
                        <div className="text-right">
                            <button
                                disabled={!comment || rating === 0}
                                onClick={handlePostSubmitReview}
                                className={`px-6 py-2 rounded-full cursor-pointer font-semibold transition duration-300 ${comment && rating
                                    ? "bg-purple-600 text-white hover:bg-purple-700"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                Đánh giá
                            </button>
                        </div>
                    </div>
                    {selectedRoom && (
                        <RoomDetailModal
                            open={isModalOpen}
                            onClose={handleCloseRoomDetail}
                            room={selectedRoom}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
