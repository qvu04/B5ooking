"use client";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { FaUserAlt } from 'react-icons/fa';
import EditProfileUser from "./EditProfileUser";
import { useState, useEffect } from 'react';
import { hideLoading, showLoading } from '@/redux/features/loadingSlice';
import { useAppDispatch } from '@/redux/hook';
import { useTranslation } from "react-i18next";
export default function Profile() {
    const { user } = useSelector((state: RootState) => state.userSlice);
    const [isEditing, setIsEditing] = useState(false);
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(showLoading());
        const timeout = setTimeout(() => {
            dispatch(hideLoading());
        }, 2000);

        return () => clearTimeout(timeout);
    }, [dispatch]);
    useEffect(() => {
        setMounted(true);
    }, [])
    if (!mounted) return null;
    return (
        <div className="max-w-4xl mx-auto mt-6 px-4 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800">{t("profile.text_2")}</h1>
                <button onClick={() => setIsEditing(true)} className="bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-800 font-semibold px-4 py-2 rounded-lg transition duration-200">
                    {t("profile.text_3")}
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
                    <h2 className="text-xl mb-1 font-semibold dark:text-black">{user?.fullName}</h2>
                    <p className="text-gray-600 mb-1 text-sm">{t("profile.text_4")}</p>
                    <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {user?.role}
                    </span>
                </div>
            </div>
            {/* Phần hoàn tất hồ sơ */}
            <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t("profile.text_5")}</h3>
                <p className="text-gray-600 mb-4">
                    {t("profile.text_6")}
                </p>
                <button className="bg-[#6246ea] hover:bg-[#5135c8] cursor-pointer text-white font-semibold px-6 py-2 rounded-lg transition duration-200">
                    {t("profile.text_7")}
                </button>
            </div>
        </div>
    );
}
