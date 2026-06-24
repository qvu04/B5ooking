"use client";
import { AutoComplete, InputNumber, Button, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { fetchAllLocation, fetchTranslateAllLocation } from '@/app/api/locationService';
import { Locations } from '@/app/types/locationTypes';
import { toSlug } from '@/utils/slug';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import React from 'react';

export default function HeaderBanner() {
    const [location, setLocation] = useState("");
    const [guestCount, setGuestCount] = useState(1);
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
    const [options, setOptions] = useState<{ value: string; label: React.ReactNode }[]>([]);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const { RangePicker } = DatePicker;
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const loadLocations = async () => {
            const locations = await fetchTranslateAllLocation(i18n.language);
            if (!locations) return;
            const formatted = locations.map((loc: Locations) => ({
                value: loc.city,
                label: (
                    <div className="flex justify-between items-center">
                        <span>{loc.city}</span>
                        <img src={loc.imageLocation} alt={loc.city} className="w-10 h-6 object-cover rounded-md ml-2" />
                    </div>
                )
            }));
            setOptions(formatted);
        };
        loadLocations();
    }, [i18n.language]);

    const handleSearch = async () => {
        if (!location.trim()) {
            toast.error("Vui lòng nhập địa điểm!");
            return;
        }
        const locations = await fetchAllLocation();
        const search = locations.find((loc: Locations) => loc.city === location);
        if (search) {
            router.push(`/location/${toSlug(search.city)}`);
            setTimeout(() => {
                setLocation("");
                setGuestCount(1);
                setDateRange(null);
            }, 300);
        } else {
            toast.error("Không tìm thấy địa điểm bạn đã nhập.");
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <header className="relative w-full h-[580px] md:h-[620px] overflow-hidden text-white">
            <video
                autoPlay
                muted
                loop
                preload="none"
                poster="/images/logo-b5ooking.png"
                className="absolute inset-0 w-full h-full object-cover z-0"
                src="/videos/header.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-10" />

            {/* Heading */}
            <div className="relative z-20 mt-24 md:mt-32 px-6 md:px-10 flex flex-col items-start justify-center h-[130px]">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">
                    <span className="text-[#6246ea]">B5ooking</span>
                    <span className="hidden sm:inline"> - {t("home.greeting")}</span>
                </h1>
                <p className="text-sm md:text-xl text-white/90 drop-shadow">{t("home.slogan")}</p>
            </div>

            {/* Search bar */}
            <div className="relative z-20 px-4 md:px-10 mt-4 md:mt-6">
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6 bg-white/20 backdrop-blur-md text-white px-4 md:px-6 py-5 md:py-4 rounded-2xl md:rounded-full w-full max-w-5xl mx-auto shadow-2xl border border-white/20">
                    {/* Location */}
                    <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-xs md:text-sm font-semibold mb-1">{t("home.search_bar_location")}</span>
                        <AutoComplete
                            value={location}
                            options={options}
                            variant="borderless"
                            placeholder={t("home.search_bar_text")}
                            className="text-white bg-transparent placeholder-white placeholder:font-semibold"
                            style={{ backgroundColor: "transparent", color: "white", borderBottom: "1px solid rgba(255,255,255,0.6)" }}
                            onChange={(value) => setLocation(value)}
                        />
                    </div>

                    {/* Divider - only desktop */}
                    <div className="hidden md:block w-px h-10 bg-white/30" />

                    {/* Date */}
                    <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-xs md:text-sm font-semibold mb-1">{t("home.search_bar_date")}</span>
                        <RangePicker
                            variant="borderless"
                            format="DD/MM/YYYY"
                            value={dateRange || undefined}
                            onChange={(value) => setDateRange(value)}
                            className="w-full text-white font-medium"
                            style={{ backgroundColor: "transparent", color: "white", borderBottom: "1px solid rgba(255,255,255,0.6)" }}
                            placeholder={[t("home.search_bar_checkIn"), t("home.search_bar_checkOut")]}
                        />
                    </div>

                    {/* Divider - only desktop */}
                    <div className="hidden md:block w-px h-10 bg-white/30" />

                    {/* Guests */}
                    <div className="flex flex-col min-w-[100px]">
                        <span className="text-xs md:text-sm font-semibold mb-1">{t("home.search_bar_guest")}</span>
                        <InputNumber
                            min={1}
                            max={100}
                            value={guestCount}
                            onChange={(value) => setGuestCount(Number(value))}
                            variant="borderless"
                            className="w-full text-white font-medium"
                            style={{ backgroundColor: "transparent", color: "white", borderBottom: "1px solid rgba(255,255,255,0.6)" }}
                        />
                    </div>

                    {/* Search button */}
                    <div className="flex justify-center md:justify-start">
                        <Button
                            onClick={handleSearch}
                            type="default"
                            icon={<SearchOutlined />}
                            className="!bg-[#6246ea] hover:!bg-[#5135c8] !text-white !border-none h-11 md:h-12 md:w-12 w-full flex items-center justify-center shadow-md md:rounded-full rounded-xl font-semibold gap-2 transition-all duration-200"
                        >
                            <span className="md:hidden">{t("home.search_button") || "Tìm kiếm"}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
