"use client"

import { registerService } from "@/app/api/authService"
import { RegisterUser } from "@/app/types/authType"
import Link from "next/link"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { FiEye, FiEyeOff } from "react-icons/fi"
import toast from "react-hot-toast";
type FormData = {
    firstName: string
    lastName: string
    gender: string
    email: string
    password: string
    confirmPassword: string
}

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormData>()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const fetchUserRegister = async (formValues: {
        firstName: string
        lastName: string
        gender: string
        email: string
        password: string
        confirmPassword: string
    }) => {
        try {
            const payload: RegisterUser = {
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                email: formValues.email,
                password: formValues.password,
                confirmPassword: formValues.confirmPassword,
                gender: formValues.gender
            }
            const res = await registerService(payload);
            const user = res.data
            console.log('✌️userRegister thành công: --->', user);
            toast.success("Đăng ký thành công");
        } catch (error) {
            console.log('✌️error --->', error);

        }
    }
    const onSubmit = (data: FormData) => {
        fetchUserRegister({
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
        })
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* LEFT SIDE - Video Background */}
            <div className="relative w-1/2 hidden md:block">
                <video
                    className="absolute inset-0 z-0 w-full h-full object-cover"
                    src="/videos/login-page.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-tr from-black/50 via-black/30 to-transparent dark:from-black/10 dark:via-black/5" />
                <div className="absolute inset-0 z-20 flex items-center justify-center p-10">
                    <h1 className="text-white text-4xl font-bold text-center leading-tight drop-shadow-lg">
                        Chào mừng bạn đến với <span className="text-[#6246ea]">B5ooking</span>
                    </h1>
                </div>
            </div>

            {/* RIGHT SIDE - Register Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-4 bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-gray-900 dark:to-gray-800">
                <div className="bg-white/50 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 shadow-xl rounded-2xl p-10 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                        Đăng ký
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* First + Last Name */}
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Họ</label>
                                <input
                                    type="text"
                                    {...register("firstName", { required: "Họ không được để trống" })}
                                    className={`mt-1 w-full px-4 py-2 rounded-xl border ${errors.firstName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-transparent dark:text-white`}
                                    placeholder="Nguyen"
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                                )}
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Tên</label>
                                <input
                                    type="text"
                                    {...register("lastName", { required: "Tên không được để trống" })}
                                    className={`mt-1 w-full px-4 py-2 rounded-xl border ${errors.lastName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-transparent dark:text-white`}
                                    placeholder="Van A"
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Giới tính</label>
                            <select
                                {...register("gender", { required: "Vui lòng chọn giới tính" })}
                                className={`mt-1 w-full px-4 py-2 rounded-xl border ${errors.gender ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-transparent dark:text-white`}
                                defaultValue=""
                            >
                                <option value="" disabled>-- Vui lòng chọn giới tính --</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                            {errors.gender && (
                                <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: "Email không được để trống" })}
                                className={`mt-1 w-full px-4 py-2 rounded-xl border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-transparent dark:text-white`}
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { required: "Mật khẩu không được để trống" })}
                                    className={`mt-1 w-full px-4 py-2 rounded-xl border ${errors.password ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 focus:outline-none pr-10 dark:bg-transparent dark:text-white`}
                                    placeholder="••••••••"
                                />
                                <div
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 dark:text-gray-300"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </div>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Xác nhận mật khẩu</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...register("confirmPassword", {
                                        required: "Vui lòng xác nhận mật khẩu",
                                        validate: (value) =>
                                            value === watch("password") || "Mật khẩu xác nhận không khớp"
                                    })}
                                    className={`mt-1 w-full px-4 py-2 rounded-xl border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-400 focus:outline-none pr-10 dark:bg-transparent dark:text-white`}
                                    placeholder="••••••••"
                                />
                                <div
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 dark:text-gray-300"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </div>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#6246ea] hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition-all duration-200"
                        >
                            Đăng ký
                        </button>
                    </form>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-center">
                        Đã có tài khoản?{" "}
                        <Link href="/login" className="text-[#6246ea] hover:underline">Đăng nhập</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
