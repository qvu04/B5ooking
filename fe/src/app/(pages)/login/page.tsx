"use client"

import Link from "next/link"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { FiEye, FiEyeOff } from "react-icons/fi"

type FormData = {
    email: string
    password: string
}

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = (data: FormData) => {
        console.log("Đăng nhập với:", data)
        // TODO: gọi API hoặc xử lý đăng nhập ở đây
    }

    return (
        <div className="flex h-screen">
            {/* LEFT SIDE - Video with overlay */}
            <div className="relative w-1/2 hidden md:block">
                <video
                    className="absolute w-full h-full object-cover"
                    src="/login-page.mp4"
                    autoPlay
                    muted
                    loop
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center p-10">
                    <h1 className="text-white text-4xl font-bold leading-tight text-center">
                        Chào mừng bạn đến với{" "}
                        <span className="text-[#6246ea]">B5ooking</span>
                    </h1>
                </div>
            </div>

            {/* RIGHT SIDE - Login Card */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-50 px-4">
                <div className="backdrop-blur-md bg-white/50 border border-gray-200 shadow-xl rounded-2xl p-10 w-full max-w-md">
                    <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">Đăng nhập</h2>
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: "Email không được để trống" })}
                                className={`mt-1 w-full px-4 py-2 rounded-xl border ${errors.email ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password + Toggle */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { required: "Mật khẩu không được để trống" })}
                                    className={`mt-1 w-full px-4 py-2 rounded-xl border ${errors.password ? "border-red-500" : "border-gray-300"
                                        } focus:ring-2 focus:ring-blue-400 focus:outline-none pr-10`}
                                    placeholder="••••••••"
                                />
                                <div
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </div>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#6246ea] hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer"
                        >
                            Đăng nhập
                        </button>
                    </form>

                    {/* Link đến trang đăng ký */}
                    <p className="text-sm text-gray-600 mt-4 text-center">
                        Chưa có tài khoản?{" "}
                        <Link href="/register" className="text-[#6246ea] hover:underline">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
