"use client"
import React from 'react'
import { useState, useEffect } from 'react';
// import { Locations } from '@/app/types/locationTypes';
import Link from 'next/link';
// import { fetchTranslateLocation } from '@/app/api/locationService';
import { toSlug } from '@/utils/slug';
// import { useTranslation } from 'react-i18next';
import Image from "next/image";
import { useGetListLocation } from '@/hooks/queries';

const LocationSkeleton = () => (
    <div className="relative rounded-xl overflow-hidden animate-pulse bg-gray-200 dark:bg-gray-700 h-52" />
);
const PopularLocation = () => {
    // const [locations, setLocations] = useState<Locations[] | null>(null);
    // const [loading, setLoading] = useState(true);
    // const { i18n, t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const { data: listLocationData, isLoading: isLoadingListLocation } = useGetListLocation();
    const locationListSlice = listLocationData?.slice(0, 6);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         const translatedLocations = await fetchTranslateLocation(i18n.language);
    //         setLocations(translatedLocations);
    //         setLoading(false);
    //     };
    //     fetchData();
    // }, [i18n.language]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-black dark:text-white">
                    Điểm đến đang thịnh hành
                </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {isLoadingListLocation
                    ? [1, 2, 3, 4, 5, 6].map((i) => <LocationSkeleton key={i} />)
                    : locationListSlice?.map((location) => (
                        <Link
                            key={location.id}
                            href={`/location/${toSlug(location.city)}`}
                            className="relative group rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 block"
                        >
                            <Image
                                src={location.imageLocation ?? ""}
                                alt={location.city ?? ""}
                                width={500}
                                height={300}
                                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2">
                                <Image
                                    className="w-5 h-5 object-cover rounded-sm flex-shrink-0"
                                    width={20}
                                    height={20}
                                    src="/images/icon_co_VN.png"
                                    alt="co_VN"
                                />
                                <h3 className="text-white text-sm md:text-base font-semibold drop-shadow-md">
                                    {location.city}
                                </h3>
                            </div>
                            <div className="absolute inset-0 bg-[#6246ea]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default PopularLocation;
