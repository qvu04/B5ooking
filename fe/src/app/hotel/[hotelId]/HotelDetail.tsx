'use client';

import { Hotels } from '@/app/types/hotelTypes';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import { Swiper as SwiperType } from 'swiper/types';

type Props = {
    hotel: Hotels;
};

export default function HotelDetailClient({ hotel }: Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    {/* Main Carousel */}
                    <div className="w-full h-80 rounded-lg overflow-hidden">
                        <Swiper
                            modules={[Autoplay, Thumbs]}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            loop={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            slidesPerView={1}
                            className="w-full h-80"
                        >
                            {hotel.images.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <img
                                        src={img.imageUrl}
                                        alt={`Slide ${i}`}
                                        className="w-full h-80 object-cover"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="mt-4">
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

                {/* Thông tin phòng */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Phòng giường đôi</h2>
                    <p className="text-gray-600 mb-2">📏 Kích thước phòng: 20m²</p>
                    <p className="italic font-medium mb-4">🛏 1 giường đôi</p>

                    <p className="font-semibold">Trong phòng tắm riêng của bạn:</p>
                    <ul className="list-disc pl-5 text-sm mb-4">
                        <li>Đồ vệ sinh cá nhân miễn phí</li>
                        <li>Vòi sen / bồn tắm</li>
                        <li>Khăn tắm, Giấy vệ sinh, Máy sấy tóc...</li>
                    </ul>

                    <p className="font-semibold mb-1">Tiện nghi:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                        {hotel.amenities.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <span>✓</span>
                                <span>{item.amenity.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Mô tả</h2>
                <p className="text-gray-700 whitespace-pre-line">{hotel.description}</p>
            </div>

            <div className="mt-6">
                <p className="text-sm text-gray-500">📍 {hotel.address}</p>
                <p className="text-sm">⭐ {hotel.averageRating || hotel.defaultRating} / 5</p>
            </div>
        </div>
    );
}
