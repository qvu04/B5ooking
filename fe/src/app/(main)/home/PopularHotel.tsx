"use client";
import React, { useEffect, useState } from "react";
import { fetchHotelByLocation } from "@/app/api/hotelService";
import { Locations } from "@/app/types/locationTypes";
import { Hotels } from "@/app/types/hotelTypes";
import { Carousel, Rate } from "antd";
import { useTranslation } from "react-i18next";
import { fetchTranslateLocation } from "@/app/api/locationService";
import Link from "next/link";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";

const HotelCardSkeleton = () => (
    <div className="px-2">
        <div className="border rounded-xl overflow-hidden animate-pulse bg-gray-100 dark:bg-gray-800">
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
            </div>
        </div>
    </div>
);

const PopularHotel = () => {
    const [locations, setLocations] = useState<Locations[] | null>(null);
    const [hotels, setHotels] = useState<Hotels[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeLocationId, setActiveLocationId] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);
    const { i18n, t } = useTranslation();

    useEffect(() => {
        const fetch = async () => {
            const translateLocs = await fetchTranslateLocation(i18n.language);
            setLocations(translateLocs);
            if (translateLocs.length > 0) setActiveLocationId(translateLocs[0].id);
        };
        fetch();
    }, [i18n.language]);

    useEffect(() => {
        const fetch = async () => {
            if (activeLocationId !== null) {
                setLoading(true);
                const translateHotel = await fetchHotelByLocation(activeLocationId, i18n.language);
                setHotels(translateHotel);
                setLoading(false);
            }
        };
        fetch();
    }, [activeLocationId, i18n.language]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="px-2 md:px-10 py-10 max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-6 items-center px-4 md:px-6">
                <h2 className="text-xl md:text-2xl font-bold w-full md:w-auto">
                    {t("home.popularHotels")}
                </h2>

                {/* Location tabs */}
                <div className="flex flex-wrap gap-2 items-center">
                    {locations?.map((location) => (
                        <button
                            key={location.id}
                            onClick={() => setActiveLocationId(location.id)}
                            className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 cursor-pointer
                                ${activeLocationId === location.id
                                    ? "bg-[#6246ea] text-white border-[#6246ea] shadow-md shadow-purple-200 dark:shadow-purple-900/30"
                                    : "bg-white dark:bg-transparent text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-[#6246ea] hover:text-[#6246ea]"
                                }`}
                        >
                            {location.city}
                        </button>
                    ))}
                </div>

                <div className="ml-auto">
                    <button className="text-sm font-semibold text-[#6246ea] hover:text-[#5135c8] transition-colors duration-200 flex items-center gap-1">
                        {t("home.seeMoreHotels")} →
                    </button>
                </div>
            </div>

            {/* Carousel */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
                    {[1, 2, 3].map((i) => <HotelCardSkeleton key={i} />)}
                </div>
            ) : (
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
                        <Link href={`/hotel/${hotel.id}`} key={hotel.id} className="px-2 block group">
                            <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden flex flex-col h-full bg-white dark:bg-[#16161a] transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
                                <div className="overflow-hidden relative">
                                    <Image
                                        src={hotel.image}
                                        alt={hotel.name}
                                        width={500}
                                        height={300}
                                        className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Rating badge on image */}
                                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-md">
                                        <AiFillStar className="text-yellow-400" size={13} />
                                        <span className="text-xs font-bold text-gray-800 dark:text-white">
                                            {(hotel.averageRating || hotel.defaultRating).toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="text-base dark:text-white font-semibold mb-1 line-clamp-2 min-h-[44px] group-hover:text-[#6246ea] transition-colors duration-200">
                                            {hotel.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-[#94a1b2] mb-3 line-clamp-1 flex items-center gap-1">
                                            <span className="text-[#6246ea]">📍</span> {hotel.address}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Rate
                                            disabled
                                            allowHalf
                                            value={hotel.averageRating || hotel.defaultRating}
                                            className="text-xs"
                                        />
                                        <span className="text-xs text-[#6246ea] font-semibold">
                                            {t("home.seeDetail") || "Xem"}  →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </Carousel>
            )}
        </div>
    );
};

export default PopularHotel;
