'use client';
import { Hotels } from '@/app/types/hotelTypes';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import { Swiper as SwiperType } from 'swiper/types';
import { geocodeAddress } from '@/lib/geocode';
import { FiShare } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import Link from 'next/link';
import MapView from '@/app/components/Map/MapViewWrapper';

type Props = {
    hotel: Hotels;
};

export default function HotelDetailClient({ hotel }: Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        console.log("hotel address:", hotel.address);
        console.log("hotel lat/lng:", hotel.latitude, hotel.longitude);
        console.log("coords final:", coords);
        if (hotel.latitude && hotel.longitude) {
            setCoords({ lat: hotel.latitude, lng: hotel.longitude });
        } else {
            geocodeAddress(hotel.address).then((res) => {
                if (res) setCoords(res);
            });
        }
    }, [hotel]);

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
            <div className="mt-10 space-y-3">
                <h2 className="text-xl font-semibold">Mô tả khách sạn</h2>
                <p className="text-gray-700 whitespace-pre-line">{hotel.description}</p>
            </div>

            {/* Thông tin thêm */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600">
                <p>📍 {hotel.address}</p>
                <p>⭐ {hotel.averageRating || hotel.defaultRating} / 5</p>
            </div>
        </div>
    );
}
