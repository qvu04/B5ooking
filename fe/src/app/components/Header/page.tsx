"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AutoComplete, DatePicker, InputNumber, Button } from "antd";
import { FaHotel, FaNewspaper, FaInfoCircle, FaSun } from "react-icons/fa";
import { MdTranslate } from "react-icons/md";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const Header = () => {
    const [location, setLocation] = useState("");
    const [guestCount, setGuestCount] = useState(1);
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);

    return (
        <header className="relative w-full h-[600px] overflow-hidden text-white">
            {/* VIDEO BACKGROUND */}
            <video
                autoPlay
                muted
                loop
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="/header.mp4"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* NAVIGATION */}
            <div className="relative z-20 flex items-center justify-between px-10 py-5">
                {/* Logo */}
                <div className="flex items-center space-x-0">
                    <img
                        src="/logo-b5ooking.png"
                        alt="logo"
                        className="w-[200px] h-[80px] object-contain"
                    />
                    <span className="text-2xl md:text-3xl font-bold text-[#6246ea] -ml-10">
                        B5ooking
                    </span>
                </div>

                {/* Menu */}
                <nav className="hidden md:flex space-x-6 text-white">
                    <Link href="/" className="group relative flex items-center gap-1 hover:text-[#6246ea] transition">
                        <FaHotel className="text-lg" />
                        Chỗ ở
                        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#6246ea] transition-all duration-300 group-hover:w-full" />
                    </Link>
                    <Link href="/tintuc" className="group relative flex items-center gap-1 hover:text-[#6246ea] transition">
                        <FaNewspaper className="text-lg" />
                        Tin tức
                        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#6246ea] transition-all duration-300 group-hover:w-full" />
                    </Link>
                    <Link href="/about" className="group relative flex items-center gap-1 hover:text-[#6246ea] transition">
                        <FaInfoCircle className="text-lg" />
                        Về chúng tôi
                        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#6246ea] transition-all duration-300 group-hover:w-full" />
                    </Link>
                </nav>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <button className="text-white hover:text-[#6246ea] text-xl">
                        <FaSun />
                    </button>
                    <button className="text-white hover:text-[#6246ea] text-xl">
                        <MdTranslate />
                    </button>
                    <Link
                        href="/login"
                        className="ml-2 px-4 py-1.5 rounded-xl bg-[#6246ea] hover:bg-blue-700 text-white font-medium transition"
                    >
                        Đăng nhập
                    </Link>
                </div>
            </div>

            {/* TEXT SECTION */}
            <div className="relative z-20 mt-10 px-10 flex flex-col items-start justify-center h-[150px] text-white">
                <h1 className="text-5xl font-extrabold mb-3">
                    <span className="text-[#6246ea]">B5ooking</span> - Cùng khám phá Việt Nam
                </h1>
                <p className="text-xl">Khám phá những chỗ ở tốt nhất cho chuyến đi của bạn</p>
            </div>

            {/* SEARCH SECTION */}
            <div className="relative z-20 px-10 mt-6">
                <div className="flex items-center justify-between gap-6 bg-white/20 backdrop-blur-md text-white px-6 py-4 rounded-full w-full max-w-5xl mx-auto shadow-lg">
                    {/* Địa điểm */}
                    <div className="flex flex-col flex-1">
                        <span className="text-sm font-semibold mb-1">Địa điểm</span>
                        <AutoComplete
                            variant="borderless"
                            placeholder="Bạn sắp đi đâu?"
                            className="text-white bg-transparent placeholder-white placeholder:font-semibold"
                            style={{ color: "white" }}
                            onChange={(value) => setLocation(value)}
                        />

                    </div>

                    {/* Ngày */}
                    <div className="flex flex-col flex-1">
                        <span className="text-sm font-semibold mb-1">Ngày</span>
                        <RangePicker
                            variant="borderless"
                            format="DD/MM/YYYY"
                            value={dateRange || undefined}
                            onChange={(value) => setDateRange(value)}
                            className="text-white bg-transparent w-full placeholder-white placeholder:font-semibold"
                            style={{ color: "white", backgroundColor: "transparent" }}
                            classNames={{
                                popup: { root: "bg-white" },
                            }}
                            placeholder={["Ngày đến", "Ngày đi"]}
                        />

                    </div>

                    {/* Khách */}
                    <div className="flex flex-col items-start">
                        <span className="text-sm font-semibold mb-1">Khách</span>
                        <InputNumber
                            min={1}
                            max={100}
                            value={guestCount}
                            onChange={(value) => setGuestCount(Number(value))}
                            variant="borderless"
                            className="text-white bg-transparent"
                            style={{ width: "80px", color: "white" }}
                        />
                    </div>

                    {/* Button */}
                    <Button
                        type="default"
                        shape="circle"
                        icon={<SearchOutlined />}
                        className="!bg-[#6246ea] hover:!bg-blue-700 !text-white !border-none w-12 h-12 flex items-center justify-center shadow-md"
                    />



                </div>
            </div>
        </header>
    );
};

export default Header;
