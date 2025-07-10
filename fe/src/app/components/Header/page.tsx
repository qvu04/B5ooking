"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AutoComplete, DatePicker, InputNumber, Button, Select } from "antd";
import { FaSun, FaMoon, FaUserAlt } from "react-icons/fa";
import { MdTranslate } from "react-icons/md";
import { SearchOutlined } from "@ant-design/icons";
import { useTheme } from "next-themes";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { useSelector } from "react-redux";
import { setUserLogoutAction } from "@/redux/features/userSlice";
const { RangePicker } = DatePicker;
import toast from "react-hot-toast";
import { RootState } from "@/lib/store";
const Header = () => {
    const [location, setLocation] = useState("");
    const [guestCount, setGuestCount] = useState(1);
    const [dateRange, setDateRange] =
        useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
    const { setTheme, resolvedTheme } = useTheme();
    const { t, i18n } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathName = usePathname();
    const navItems = [
        { href: "/", label: "Chỗ ở", icon: "/images/home.png" },
        { href: "/article", label: "Tin tức", icon: "/images/article.png" },
        { href: "/about", label: "Về chúng tôi", icon: "/images/about.png" },
    ];
    const { user } = useSelector((state: RootState) => state.userSlice);
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(setUserLogoutAction());
        toast.success("Đăng xuất thành công");
    }
    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!mounted) return null; // 💥 Ngăn render khi chưa mount để tránh lỗi hydration

    return (
        <>
            {/* NAVIGATION */}
            <nav
                className={`sticky top-0 z-50 w-full px-10 py-5 flex items-center justify-between transition-all duration-300 ${isScrolled
                    ? "bg-white dark:bg-black dark:text-white text-black shadow-md"
                    : "bg-black/30 dark:bg-black/30 dark:text-white backdrop-blur-md text-white"
                    }`}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-0">
                    <img
                        src="/images/logo-b5ooking.png"
                        alt="logo"
                        className="w-[200px] h-[80px] object-contain"
                    />
                    <span className="text-2xl md:text-3xl font-bold text-[#6246ea] -ml-10">
                        B5ooking
                    </span>
                </Link>

                {/* Menu */}
                <nav className="hidden md:flex space-x-6">
                    {navItems.map((item) => {
                        const isActive = pathName === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group relative flex items-center gap-1 transition-all duration-300
          ${isActive ? "text-[#6246ea] scale-[1.05]" : "hover:text-[#6246ea]"}`}
                            >
                                <img
                                    className={`w-6 h-6 object-cover rounded-sm transition-transform duration-300
            ${isActive ? "scale-125" : "group-hover:scale-110"}`}
                                    src={item.icon}
                                    alt={item.label}
                                />
                                <span className="font-medium">{item.label}</span>

                                {/* Underline hiệu ứng */}
                                <span
                                    className={`absolute left-0 -bottom-1 h-[2px] bg-[#6246ea] transition-all duration-300
            ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                                />
                            </Link>
                        );
                    })}
                </nav>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    {/* Toggle theme */}
                    <button
                        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                        className="text-xl hover:text-[#6246ea] transition"
                    >
                        {resolvedTheme === "dark" ? <FaSun /> : <FaMoon />}
                    </button>

                    {/* Select language */}
                    <div className="flex items-center gap-1">
                        <MdTranslate className="text-xl" />
                        <Select
                            value={i18n.language}
                            onChange={(val) => i18n.changeLanguage(val)}
                            className="w-[130px] text-white dark:text-white"
                            suffixIcon={null} // Ẩn icon xổ xuống nếu bạn muốn
                            popupMatchSelectWidth={false}
                            options={[
                                { value: "vi", label: "🇻🇳 Tiếng Việt" },
                                { value: "en", label: "🇺🇸 English" },
                            ]}
                            classNames={{
                                popup: {
                                    root: resolvedTheme === "dark" ? "text-white" : "text-black",
                                },
                            }}
                        />


                    </div>

                    {/* Login */}
                    {user ? (
                        <div className="flex items-center gap-4">
                            {/* Avatar và tên */}
                            <div className="flex items-center gap-2">
                                {user.data.User.avatar ? (
                                    <img
                                        src={user.data.User.avatar}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
                                        <FaUserAlt className="text-sm" />
                                    </div>
                                )}
                                <span className="text-sm font-medium">{user.data.User.fullName}</span>
                            </div>

                            {/* Nút đăng xuất */}
                            <button
                                onClick={handleLogout}
                                className="px-3 py-1.5 cursor-pointer rounded-xl bg-[#6246ea] hover:bg-blue-700 text-white font-medium transition"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="ml-2 px-4 py-1.5 rounded-xl bg-[#6246ea] hover:bg-blue-700 text-white font-medium transition"
                        >
                            Đăng nhập
                        </Link>
                    )}


                </div>
            </nav>

            {/* HEADER CONTENT */}
            <header className="relative w-full h-[600px] overflow-hidden text-white">
                {/* Video Background */}
                <video
                    autoPlay
                    muted
                    loop
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src="/videos/header.mp4"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 z-10" />

                {/* Text Section */}
                <div className="relative z-20 mt-28 px-10 flex flex-col items-start justify-center h-[150px] text-white">
                    <h1 className="text-5xl font-extrabold mb-3">
                        <span className="text-[#6246ea]">B5ooking</span> - {t("home.greeting")}
                    </h1>
                    <p className="text-xl">{t("home.slogan")}</p>
                </div>

                {/* Search Section */}
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
        </>
    );
};

export default Header;
