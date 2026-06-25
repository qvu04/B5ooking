"use client";
import { setUserLoginAction } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FiMail, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import LoginWithGoogle from "./google-login/LoginWithGoogle";
import { LoginPayload, loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/mutations";
import { LoaderCircle } from 'lucide-react';
export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
    });
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { mutateAsync: loginUser, isPending: isPendingUserLogin } = useLogin();
    const onSubmit = async (payload: LoginPayload) => {
        try {
            // console.log(payload);
            const res = await loginUser(payload);
            const { User, token_access } = res.data;
            const userData = { ...User, token_access };
            localStorage.setItem('user', JSON.stringify(userData));
            dispatch(setUserLoginAction(userData));
            toast.success("Đăng nhập thành công");
            router.push("/");
        } catch (error) {
            console.log('Lỗi đăng nhập:', error);
            toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        }
    };
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <video
                src="/videos/intro.mp4"
                autoPlay muted loop playsInline preload="none"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />

            <div className="relative z-20 flex flex-col items-center justify-center h-full px-4">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg">
                        {t("login.title")} <span className="text-[#6246ea]">B5ooking</span>
                    </h1>
                    <p className="text-white/70 text-sm mt-1">Nền tảng đặt phòng hàng đầu Việt Nam</p>
                </div>

                <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30 dark:border-white/10">
                    <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-6">
                        {t("login.form_title")}
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t("login.form_email")}
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="email"
                                    {...register("email")}
                                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-gray-800 dark:text-white dark:bg-transparent
                                        ${errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 dark:border-gray-600 focus:ring-[#6246ea]"}
                                        focus:ring-2 focus:outline-none transition-all duration-200`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t("login.form_password")}
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-gray-800 dark:text-white dark:bg-transparent
                                        ${errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 dark:border-gray-600 focus:ring-[#6246ea]"}
                                        focus:ring-2 focus:outline-none transition-all duration-200`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isPendingUserLogin}
                            className="w-full bg-[#6246ea] hover:bg-[#5135c8] disabled:opacity-70 text-white py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-purple-300 dark:hover:shadow-purple-900/30 mt-2 cursor-pointer"
                        >
                            {isPendingUserLogin ? <span className="flex items-center justify-center gap-2"><LoaderCircle className="animate-spin size-3" />Đang đăng nhập...</span> : t("login.form_button")}
                        </button>
                    </form>

                    <div className="flex items-center my-4">
                        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                        <span className="mx-3 text-xs text-gray-500">hoặc</span>
                        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                    </div>

                    <LoginWithGoogle />

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                        {t("login.form_text_1")}{" "}
                        <Link href="/register" className="text-[#6246ea] hover:text-[#5135c8] font-semibold hover:underline transition-colors">
                            {t("login.form_text_2")}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
