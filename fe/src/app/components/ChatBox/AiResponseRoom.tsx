"use client";
import React from "react";
import { AiResponse } from "@/app/types/aiType";

const AiResponseRoom: React.FC<AiResponse> = ({ data }) => {
    if (!data || data.length === 0) return <div className="text-red-500 mt-2">Hiện chưa có thông tin</div>;


    const isList = data.length > 1; // nếu có nhiều phòng => chỉ hiển thị danh sách ngắn gọn
    const room = data[0]; // nếu chỉ 1 phòng => hiển thị chi tiết

    return (
        <div className="mt-2 text-xs text-gray-700 dark:text-gray-300 space-y-2">
            {isList ? (
                // --- TRƯỜNG HỢP NHIỀU PHÒNG ---
                <ul className="list-disc ml-4 space-y-1">
                    {data.map((r) => (
                        <li key={r.id}>
                            <strong>{r.name}</strong> — {r.type}
                        </li>
                    ))}
                </ul>
            ) : (
                // --- TRƯỜNG HỢP CHỈ MỘT PHÒNG ---
                <div>
                    <p><strong>Tên phòng:</strong> {room.name}</p>
                    <p><strong>Giá:</strong> {room.price} VNĐ</p>
                    <p><strong>Số lượng khách tối đa:</strong> {room.maxGuests}</p>
                    <p><strong>Loại phòng:</strong> {room.type}</p>
                    {room.discount === 0 ? (
                        <p><strong>Không có chương trình giảm giá</strong></p>

                    ) : (
                        <p><strong>Đang có chương trình giảm giá:</strong> {room.discount}%</p>
                    )}
                    {room.description && (
                        <p><strong>Mô tả:</strong> {room.description}</p>
                    )}
                    {room.image && (
                        <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-32 object-cover rounded-lg mt-1"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default AiResponseRoom;
