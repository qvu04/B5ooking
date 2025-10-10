"use client";
import React from "react";

type AiResponseHotelProps = {
    data: any[];
};

const AiResponseHotel: React.FC<AiResponseHotelProps> = ({ data }) => {
    if (!data || data.length === 0) return null;

    const hotel = data[0];
    const isList = data.length > 1;

    return (
        <div className="mt-2 text-xs text-gray-700 dark:text-gray-300 space-y-2">
            {isList ? (
                <ul className="list-disc pl-5 space-y-1">
                    {data.map((h) => (
                        <li key={h.id}>
                            <strong>{h.name}</strong> — {h.location?.city}
                        </li>
                    ))}
                </ul>
            ) : (
                <>
                    <p><strong>Tên:</strong> {hotel.name}</p>
                    <p><strong>Địa chỉ:</strong> {hotel.address}</p>
                    <p><strong>Thành phố:</strong> {hotel.location?.city}</p>
                    <p><strong>Rating:</strong> {hotel.averageRating} ⭐</p>
                    <p><strong>Mô tả:</strong> {hotel.description}</p>

                    {hotel.image && (
                        <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-full h-32 object-cover rounded-lg mt-1"
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default AiResponseHotel;
