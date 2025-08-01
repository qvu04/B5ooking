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
    }, []);

    if (!mounted) return null;

    return (
        <div className="max-w-4xl mx-auto mt-6 px-4 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    {t("profile.text_2")}
                </h1>
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg transition duration-200"
                >
                    {t("profile.text_3")}
                </button>
            </div>

            {/* Form chỉnh sửa */}
            {isEditing && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
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
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                {user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-20 h-20 rounded-full object-cover border"
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-white">
                        <FaUserAlt className="text-2xl" />
                    </div>
                )}

                <div className="text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">{user?.fullName}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">{t("profile.text_4")}</p>
                    <span className="inline-block mt-1 bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {user?.role}
                    </span>
                </div>
            </div>

            {/* Phần hoàn tất hồ sơ */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-2">{t("profile.text_5")}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t("profile.text_6")}</p>
                <button className="bg-[#6246ea] hover:bg-[#5135c8] text-white font-semibold px-6 py-2 rounded-lg transition duration-200">
                    {t("profile.text_7")}
                </button>
            </div>
        </div>
    );
}
