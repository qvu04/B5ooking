"use client";
import React, { useEffect, useState } from "react";
import { getSomeLocation } from "@/app/api/locationService";
import { getHotelsByLocation } from "@/app/api/hotelService";
import { Locations } from "@/app/types/locationTypes";
import { Hotels } from "@/app/types/hotelTypes";
import { Carousel, Rate } from "antd";

const PopularHotel = () => {
    const [locations, setLocations] = useState<Locations[] | null>(null);
    const [hotels, setHotels] = useState<Hotels[] | null>(null);
    const [activeLocationId, setActiveLocationId] = useState<number | null>(null);

    // Lấy danh sách địa điểm
    const fetchLocation = async () => {
        try {
            const res = await getSomeLocation();
            const locs = res.data.data.locations;
            setLocations(locs);
            if (locs.length > 0) setActiveLocationId(locs[0].id);
        } catch (error) {
            console.error("Lỗi lấy địa điểm:", error);
        }
    };

    // Lấy danh sách khách sạn theo location
    const fetchHotels = async (locationId: number) => {
        try {
            const res = await getHotelsByLocation(locationId);
            setHotels(res.data.data.hotels);
        } catch (error) {
            console.error("Lỗi lấy khách sạn:", error);
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    useEffect(() => {
        if (activeLocationId !== null) {
            fetchHotels(activeLocationId);
        }
    }, [activeLocationId]);

    return (
        <div className="px-2 md:px-10 py-10 max-w-7xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold italic mb-4 pl-4 md:pl-6">
                Những chỗ nghỉ nổi bật được đề xuất cho quý khách:
            </h2>

            {/* Tabs địa điểm */}
            <div className="flex flex-wrap gap-3 mb-6 items-center">
                {locations?.map((location) => (
                    <button
                        key={location.id}
                        onClick={() => setActiveLocationId(location.id)}
                        className={`px-4 py-2 rounded-full border transition cursor-pointer 
                                ${activeLocationId === location.id
                                ? "bg-[#6246ea] text-[#fffffe]"
                                : "bg-gray-100 text-gray-800 hover:bg-[#e0e0ff] hover:text-[#6246ea] hover:border-[#6246ea]"
                            }`}
                    >
                        {location.city}
                    </button>
                ))}
                <div className="ml-auto">
                    <button className="text-sm font-semibold text-black hover:text-[#6246ea] transition">
                        Xem Thêm Các Chỗ Nghỉ Khác &gt;
                    </button>
                </div>
            </div>

            {/* Carousel */}
            <Carousel
                dots={false}
                infinite={false}
                swipeToSlide
                arrows
                slidesToShow={3}
                responsive={[
                    { breakpoint: 1024, settings: { slidesToShow: 2 } },
                    { breakpoint: 640, settings: { slidesToShow: 1 } },
                ]}
            >
                {hotels?.map((hotel) => (
                    <div key={hotel.id} className="px-2">
                        <div className="border rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col h-full bg-white">
                            <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 flex flex-col justify-between flex-1">
                                <div>
                                    <h3 className="text-lg font-semibold mb-1 line-clamp-2 min-h-[48px]">
                                        {hotel.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2 min-h-[40px]">
                                        {hotel.address}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Rate
                                        disabled
                                        allowHalf
                                        value={hotel.averageRating || hotel.defaultRating}
                                    />
                                    <span className="text-sm text-gray-500">
                                        ({hotel.averageRating || hotel.defaultRating})
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default PopularHotel;
