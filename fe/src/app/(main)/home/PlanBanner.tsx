"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const PlanBanner = () => {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return (
        <div className="bg-gradient-to-br from-[#d1d1e9] via-[#e0e7ff] to-[#c7d2fe] dark:from-[#1e1b2e] dark:via-[#242629] dark:to-[#1a1a2e] rounded-2xl shadow-lg p-6 md:p-12 my-10 mx-4 md:mx-auto max-w-6xl border border-[#c4b5fd]/30 dark:border-[#6246ea]/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left content */}
                <div className="bg-white/60 dark:bg-black/30 backdrop-blur-sm rounded-[80px] md:rounded-[100px] px-8 md:px-10 py-8 shadow-md text-center border border-white/50 dark:border-white/10">
                    <div className="w-12 h-12 rounded-full bg-[#6246ea]/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">✈️</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#2b2c34] dark:text-white mb-3 leading-snug">
                        {t("home.plan_banner_text_1")}<br />
                        {t("home.plan_banner_text_2")}
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 dark:text-[#94a1b2] mb-6 leading-relaxed">
                        {t("home.plan_banner_text_3")}
                    </p>
                    <button className="bg-[#6246ea] hover:bg-[#503ac7] text-white px-8 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-purple-300 dark:shadow-purple-900/30 transition-all duration-200 hover:scale-105 hover:shadow-xl">
                        {t("home.plan_banner_button")}
                    </button>
                </div>

                {/* Right image */}
                <div className="flex justify-center">
                    <Image
                        src="/images/home_plan.png"
                        alt="home plan"
                        width={500}
                        height={300}
                        className="w-full max-w-sm object-contain drop-shadow-2xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default PlanBanner;
