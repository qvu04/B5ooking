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
import toast from "react-hot-toast";
import { RootState } from "@/lib/store";
import { fetchAllLocation } from "@/app/api/locationService";
import { Locations } from "@/app/types/locationTypes";
import { useRouter } from 'next/navigation';
import { toSlug } from '@/utils/slug';
const { RangePicker } = DatePicker;

const Header = () => {
    const [location, setLocation] = useState("");
    const [guestCount, setGuestCount] = useState(1);
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
    const [options, setOptions] = useState<{ value: string; label: React.ReactNode }[]>([]);
    const { setTheme, resolvedTheme } = useTheme();
    const { t, i18n } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathName = usePathname();
    const dispatch = useAppDispatch();
    const { user } = useSelector((state: RootState) => state.userSlice);
    const router = useRouter();
    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const loadLocations = async () => {
            const locations = await fetchAllLocation();
            if (!locations) return;
            const formatted = locations.map((loc: Locations) => ({
                value: loc.city,
                label: (
                    <div className="flex justify-between items-center">
                        <span>{loc.city}</span>
                        <img
                            src={loc.imageLocation}
                            alt={loc.city}
                            className="w-10 h-6 object-cover rounded-md ml-2"
                        />
                    </div>
                )
            }));
            setOptions(formatted);
        };
        loadLocations();
    }, []);

    if (!mounted) return null;
    const handleSearch = async () => {
        if (!location.trim()) {
            toast.error("Vui lòng nhập địa điểm!");
            return;
        }

        const locations = await fetchAllLocation();
        const search = locations.find((loc: Locations) => loc.city === location);

        if (search) {
            // Chuyển trang
            router.push(`/location/${toSlug(search.city)}`);

            // Reset lại form
            setTimeout(() => {
                setLocation("");
                setGuestCount(1); // có thể để về 1 mặc định
                setDateRange(null);
            }, 300); // để reset sau khi router.push hoạt động
        } else {
            toast.error("Không tìm thấy địa điểm bạn đã nhập.");
        }
    };


    return (
        <>
            <nav className={`sticky top-0 z-50 w-full px-10 py-5 flex items-center justify-between transition-all duration-300 ${isScrolled ? "bg-white dark:bg-black dark:text-white text-black shadow-md" : "bg-black/30 dark:bg-black/30 dark:text-white backdrop-blur-md text-white"}`}>
                <Link href="/" className="flex items-center space-x-0">
                    <img src="/images/logo-b5ooking.png" alt="logo" className="w-[200px] h-[80px] object-contain" />
                    <span className="text-2xl md:text-3xl font-bold text-[#6246ea] -ml-10">B5ooking</span>
                </Link>
                <nav className="hidden md:flex space-x-6">
                    {["/", "/article", "/about"].map((href, index) => {
                        const isActive = pathName === href;
                        const labels = ["Chỗ ở", "Tin tức", "Về chúng tôi"];
                        const icons = ["/images/home.png", "/images/article.png", "/images/about.png"];
                        return (
                            <Link key={href} href={href} className={`group relative flex items-center gap-1 transition-all duration-300 ${isActive ? "text-[#6246ea] scale-[1.05]" : "hover:text-[#6246ea]"}`}>
                                <img className={`w-6 h-6 object-cover rounded-sm transition-transform duration-300 ${isActive ? "scale-125" : "group-hover:scale-110"}`} src={icons[index]} alt={labels[index]} />
                                <span className="font-medium">{labels[index]}</span>
                                <span className={`absolute left-0 -bottom-1 h-[2px] bg-[#6246ea] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                            </Link>
                        );
                    })}
                </nav>
                <div className="flex items-center space-x-4">
                    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="text-xl hover:text-[#6246ea] transition">
                        {resolvedTheme === "dark" ? <FaSun /> : <FaMoon />}
                    </button>
                    <div className="flex items-center gap-1">
                        <MdTranslate className="text-xl" />
                        <Select
                            value={i18n.language}
                            onChange={(val) => i18n.changeLanguage(val)}
                            className="w-[130px] text-white dark:text-white"
                            suffixIcon={null}
                            popupMatchSelectWidth={false}
                            options={[
                                { value: "vi", label: "🇻🇳 Tiếng Việt" },
                                { value: "en", label: "🇺🇸 English" },
                            ]}
                        />
                    </div>
                    {user ? (
                        <Link href={"/profile"} className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {user.data.User.avatar ? (
                                    <img src={user.data.User.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
                                        <FaUserAlt className="text-sm" />
                                    </div>
                                )}
                                <span className="text-sm font-medium">{user.data.User.fullName}</span>
                            </div>
                            <button onClick={() => { dispatch(setUserLogoutAction()); toast.success("Đăng xuất thành công"); }} className="px-3 py-1.5 rounded-xl bg-[#6246ea] hover:bg-blue-700 text-white font-medium transition">Đăng xuất</button>
                        </Link>
                    ) : (
                        <Link href="/login" className="ml-2 px-4 py-1.5 rounded-xl bg-[#6246ea] hover:bg-blue-700 text-white font-medium transition">Đăng nhập</Link>
                    )}
                </div>
            </nav>

            <header className="relative w-full h-[600px] overflow-hidden text-white">
                <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover z-0" src="/videos/header.mp4" />
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="relative z-20 mt-28 px-10 flex flex-col items-start justify-center h-[150px] text-white">
                    <h1 className="text-5xl font-extrabold mb-3">
                        <span className="text-[#6246ea]">B5ooking</span> - {t("home.greeting")}
                    </h1>
                    <p className="text-xl">{t("home.slogan")}</p>
                </div>
                <div className="relative z-20 px-10 mt-6">
                    <div className="flex items-center justify-between gap-6 bg-white/20 backdrop-blur-md text-white px-6 py-4 rounded-full w-full max-w-5xl mx-auto shadow-lg">
                        {/* Địa điểm */}
                        <div className="flex flex-col flex-1">
                            <span className="text-sm font-semibold mb-1">Địa điểm</span>
                            <AutoComplete
                                value={location}
                                options={options}
                                variant="borderless"
                                placeholder="Bạn sắp đi đâu?"
                                className="text-white bg-transparent placeholder-white placeholder:font-semibold"
                                style={{
                                    backgroundColor: "transparent",
                                    color: "white",
                                    borderBottom: "1px solid white",
                                }}
                                onChange={(value) => setLocation(value)}
                            />
                        </div>

                        {/* Ngày */}
                        <div className="flex-1 min-w-[150px]">
                            <span className="text-xs md:text-sm font-semibold mb-1 block">Ngày</span>
                            <RangePicker
                                variant="borderless"
                                format="DD/MM/YYYY"
                                value={dateRange || undefined}
                                onChange={(value) => setDateRange(value)}
                                className="w-full text-white font-medium"
                                style={{
                                    backgroundColor: "transparent",
                                    color: "white",
                                    borderBottom: "1px solid white",
                                }}
                                placeholder={["Ngày đến", "Ngày đi"]}
                            />
                        </div>

                        {/* Số khách */}
                        <div className="min-w-[100px]">
                            <span className="text-xs md:text-sm font-semibold mb-1 block">Khách</span>
                            <InputNumber
                                min={1}
                                max={100}
                                value={guestCount}
                                onChange={(value) => setGuestCount(Number(value))}
                                variant="borderless"
                                className="w-full text-white font-medium"
                                style={{
                                    backgroundColor: "transparent",
                                    color: "white",
                                    borderBottom: "1px solid white",
                                }}
                            />
                        </div>

                        {/* Nút tìm kiếm */}
                        <Button
                            onClick={handleSearch}
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
