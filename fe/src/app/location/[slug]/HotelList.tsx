'use client';
import { Hotels } from '@/app/types/hotelTypes';
import { Carousel } from 'antd';
import Link from 'next/link';
type Props = {
    hotels: Hotels[];
};

export default function HotelListClient({ hotels }: Props) {
    return (
        <div className="w-full lg:w-[70%] pr-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
                <div
                    key={hotel.id}
                    className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white dark:bg-[#16161a]"
                >
                    {/* Carousel ảnh */}
                    <div className="relative group">
                        <Carousel
                            autoplay
                            dots={true}
                            className="rounded-t-2xl"
                        >
                            {/* Ảnh chính */}
                            <div>
                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    className="w-full h-[200px] object-cover rounded-t-2xl"
                                />
                            </div>

                            {/* Các ảnh phụ */}
                            {hotel.images.map((img, index) => (
                                <div key={index}>
                                    <img
                                        src={img.imageUrl}
                                        alt={`Ảnh phụ ${index + 1}`}
                                        className="w-full h-[200px] object-cover rounded-t-2xl"
                                    />
                                </div>
                            ))}
                        </Carousel>

                        {/* Label yêu thích */}
                        <div className="absolute top-2 left-2 bg-white dark:text-black text-xs px-2 py-1 rounded-full shadow font-medium">
                            Được khách yêu thích
                        </div>
                    </div>

                    {/* Nội dung khách sạn */}
                    <Link href={`/hotel/${hotel.id}`}>
                        <div className="p-5 space-y-1">
                            <h3 className="text-base font-semibold  text-gray-900 dark:text-[#fffffe] line-clamp-1">{hotel.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-[#94a1b2] line-clamp-1">{hotel.address}</p>
                            <p className="text-sm text-gray-700 dark:text-[#94a1b2] line-clamp-2">{hotel.description}</p>
                            <div className="text-yellow-500 font-semibold">
                                ★ {(hotel.averageRating || hotel.defaultRating).toFixed(1)}
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
