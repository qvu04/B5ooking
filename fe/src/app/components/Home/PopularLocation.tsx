"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { Locations } from '@/app/types/locationTypes';
import Link from 'next/link';
import { fetchSomeLocation } from '@/app/api/locationService';
import { toSlug } from '@/utils/slug';


const PopularLocation = () => {
    const [locations, setLocations] = useState<Locations[] | null>(null);
 
    useEffect(() => {
        (async () => {
            const loc: Locations[] = await fetchSomeLocation()
            setLocations(loc);
        })()
    }, [])
 

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Điểm đến đang thịnh hành</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {locations?.map((location) => (
                    <Link
                        href={`/location/${toSlug(location.city)}`}
                        key={location.id}
                        className="relative group rounded-lg overflow-hidden shadow-md border"
                    >
                        <img
                            src={location.imageLocation}
                            alt={location.city}
                            className="w-full h-48 object-cover transform duration-300 group-hover:scale-110"
                        />

                        {/* Overlay xuất hiện từ dưới lên */}
                        <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <div className="flex items-center gap-2 mb-4">
                                <img
                                    className="w-5 h-5 object-cover rounded-sm"
                                    src="/images/icon_co_VN.png"
                                    alt="co_VN"
                                />
                                <h3 className="text-white text-lg font-semibold text-center">
                                    {location.city}
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PopularLocation