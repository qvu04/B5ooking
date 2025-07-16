"use client";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { FaUserAlt } from 'react-icons/fa';
import EditProfileUser from "./EditProfileUser";
import { useState } from "react";
export default function Profile() {
    const { user } = useSelector((state: RootState) => state.userSlice);
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div className="max-w-4xl mx-auto mt-6 px-4 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">Giới thiệu bản thân</h1>
                <button onClick={() => setIsEditing(true)} className="bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-800 font-semibold px-4 py-2 rounded-lg transition duration-200">
                    Chỉnh sửa
                </button>
            </div>
            {/* Nếu đang ở chế độ chỉnh sửa */}
            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <EditProfileUser
                        isOpen={isEditing}
                        onClose={() => setIsEditing(false)}
                        defaultValues={{
                            firstName: user.firstName,
                            lastName: user.lastName,
                            phone: user.phone,
                            gender: user.gender,
                        }}
                    />
                </div>
            )}
            {/* Thông tin người dùng */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md">
                {user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-16 h-16 rounded-full object-cover border"
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-white">
                        <FaUserAlt className="text-2xl" />
                    </div>
                )}
                <div>
                    <h2 className="text-xl font-semibold">{user?.fullName}</h2>
                    <p className="text-gray-600 text-sm">Thành viên từ năm 2024</p>
                    <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {user?.role}
                    </span>
                </div>
            </div>

            {/* Phần hoàn tất hồ sơ */}
            <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Hoàn tất hồ sơ của bạn</h3>
                <p className="text-gray-600 mb-4">
                    Hồ sơ B5ooking là một phần quan trọng của mọi lượt đặt. Hãy hoàn tất hồ sơ để giúp khách và các host khác hiểu hơn về bạn.
                </p>
                <button className="bg-[#6246ea] hover:bg-[#5135c8] cursor-pointer text-white font-semibold px-6 py-2 rounded-lg transition duration-200">
                    Bắt đầu
                </button>
            </div>
        </div>
    );
}
