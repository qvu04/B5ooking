"use client";

import { registerService } from "@/app/api/authService";
import { RegisterUser } from "@/app/types/authType";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

type FormData = {
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function RegisterPage() {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    const fetchUserRegister = async (formValues: FormData) => {
        try {
            const payload: RegisterUser = {
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                gender: formValues.gender,
                email: formValues.email,
                password: formValues.password,
                confirmPassword: formValues.confirmPassword,
            };
            await registerService(payload);
            toast.success("Đăng ký thành công");
            router.push("/login");
        } catch (error) {
            console.log("✌️Lỗi đăng ký:", error);
            toast.error("Đăng ký thất bại. Vui lòng thử lại.");
        }
    };

    const onSubmit = (data: FormData) => fetchUserRegister(data);

    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    const inputClass = (hasError: boolean) =>
        `w-full pl-10 pr-4 py-2.5 rounded-xl border text-gray-800 dark:text-white dark:bg-transparent
        ${hasError ? "border-red-500 focus:ring-red-400" : "border-gray-300 dark:border-gray-600 focus:ring-[#6246ea]"}
        focus:ring-2 focus:outline-none transition-all duration-200`;

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            <video
                className="absolute inset-0 z-0 w-full h-full object-cover"
                src="/videos/intro.mp4"
                autoPlay muted loop preload="none" playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />

            <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-10">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg">
                        {t("register.title")} <span className="text-[#6246ea]">B5ooking</span>
                    </h1>
                    <p className="text-white/70 text-sm mt-1">Tham gia ngay để nhận ưu đãi tốt nhất</p>
                </div>

                <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-2xl rounded-2xl p-8 w-full max-w-md">
                    <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-6">
                        {t("register.form_title")}
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name row */}
                        <div className="flex gap-3">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("register.form_text_1")}</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                                    <input
                                        type="text"
                                        {...register("firstName", { required: "Họ không được để trống" })}
                                        className={inputClass(!!errors.firstName)}
                                        placeholder="Nguyen"
                                    />
                                </div>
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("register.form_text_2")}</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                                    <input
                                        type="text"
                                        {...register("lastName", { required: "Tên không được để trống" })}
                                        className={inputClass(!!errors.lastName)}
                                        placeholder="Van A"
                                    />
                                </div>
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("register.form_text_3")}</label>
                            <select
                                {...register("gender", { required: "Vui lòng chọn giới tính" })}
                                className={`${inputClass(!!errors.gender)} pl-4`}
                                defaultValue=""
                            >
                                <option value="" disabled>{t("register.form_text_4")}</option>
                                <option value="male">{t("register.form_male")}</option>
                                <option value="female">{t("register.form_female")}</option>
                            </select>
                            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("register.form_text_5")}</label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                                <input
                                    type="email"
                                    {...register("email", { required: "Email không được để trống" })}
                                    className={inputClass(!!errors.email)}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("register.form_text_6")}</label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { required: "Mật khẩu không được để trống" })}
                                    className={`${inputClass(!!errors.password)} pr-10`}
                                    placeholder="••••••••"
                                />
                                <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("register.form_text_7")}</label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...register("confirmPassword", {
                                        required: "Vui lòng xác nhận mật khẩu",
                                        validate: (value) => value === watch("password") || "Mật khẩu xác nhận không khớp",
                                    })}
                                    className={`${inputClass(!!errors.confirmPassword)} pr-10`}
                                    placeholder="••••••••"
                                />
                                <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#6246ea] hover:bg-[#5135c8] disabled:opacity-70 text-white py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-purple-300 dark:hover:shadow-purple-900/30 cursor-pointer mt-2"
                        >
                            {isSubmitting ? "Đang đăng ký..." : t("register.form_button")}
                        </button>
                    </form>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                        {t("register.form_text_8")}{" "}
                        <Link href="/login" className="text-[#6246ea] hover:text-[#5135c8] font-semibold hover:underline transition-colors">
                            {t("register.form_text_9")}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
