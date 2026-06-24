'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const PopularTravel = () => {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-[#2b2c34] dark:text-[#fffffe] mb-6">{t("home.popular_travel_tile")}</h2>

            {/* Login prompt box */}
            <div className="bg-gradient-to-r from-[#d1d1e9] to-[#e0e7ff] dark:from-[#242629] dark:to-[#2d2f3d] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="flex-1">
                    <h3 className="text-lg text-[#2b2c34] dark:text-[#fffffe] font-semibold mb-1">
                        {t("home.popular_travel_text_1")}
                    </h3>
                    <p className="text-[#2b2c34] dark:text-[#94a1b2]">
                        {t("home.popular_travel_text_2")}{' '}
                        <span className="text-[#e45858] dark:text-[#7f5af0] font-bold">
                            {t("home.popular_travel_text_discount")}
                        </span>{' '}
                        {t("home.popular_travel_text_2_1")}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Link
                        href="/login"
                        className="bg-[#6246ea] hover:bg-[#5135c8] text-white px-6 py-2.5 rounded-full text-sm font-semibold text-center w-full sm:w-auto transition-all duration-200 shadow-md hover:shadow-purple-300 dark:hover:shadow-purple-900/30"
                    >
                        {t("home.popular_travel_button_1")}
                    </Link>
                    <Link
                        href="/register"
                        className="border-2 border-[#6246ea] text-[#6246ea] hover:bg-[#6246ea] hover:text-white px-6 py-2.5 rounded-full text-sm font-semibold text-center w-full sm:w-auto transition-all duration-200"
                    >
                        {t("home.popular_travel_button_2")}
                    </Link>
                </div>
            </div>

            {/* Benefit cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="group bg-white dark:bg-[#242629] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#e0e7ff] dark:bg-[#2d2f3d] flex items-center justify-center group-hover:bg-[#6246ea]/20 transition-colors duration-300">
                        <Image src="/images/calendar.png" alt="calendar" width={40} height={40} className="w-10 h-10 object-contain" />
                    </div>
                    <h4 className="font-semibold text-[#2b2c34] dark:text-[#fffffe] text-base mb-2">{t("home.popular_travel_text_3")}</h4>
                    <p className="text-sm text-[#2b2c34] dark:text-[#94a1b2]">
                        <span className="text-[#e45858] dark:text-[#7f5af0] font-semibold">{t("home.popular_travel_free")}</span> {t("home.popular_travel_text_4")}
                    </p>
                </div>

                <div className="group bg-white dark:bg-[#242629] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#e0e7ff] dark:bg-[#2d2f3d] flex items-center justify-center group-hover:bg-[#6246ea]/20 transition-colors duration-300">
                        <Image src="/images/world.png" alt="world" width={40} height={40} className="w-10 h-10 object-contain" />
                    </div>
                    <h4 className="font-semibold text-[#2b2c34] dark:text-[#fffffe] text-base mb-2">{t("home.popular_travel_text_5")}</h4>
                    <p className="text-sm text-[#2b2c34] dark:text-[#94a1b2]">{t("home.popular_travel_text_6")}</p>
                </div>

                <div className="group bg-white dark:bg-[#242629] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#e0e7ff] dark:bg-[#2d2f3d] flex items-center justify-center group-hover:bg-[#6246ea]/20 transition-colors duration-300">
                        <Image src="/images/hotline.png" alt="hotline" width={40} height={40} className="w-10 h-10 object-contain" />
                    </div>
                    <h4 className="font-semibold text-[#2b2c34] dark:text-[#fffffe] text-base mb-2">{t("home.popular_travel_text_7")}</h4>
                    <p className="text-sm text-[#2b2c34] dark:text-[#94a1b2]">{t("home.popular_travel_text_8")}</p>
                </div>
            </div>
        </div>
    );
};

export default PopularTravel;
