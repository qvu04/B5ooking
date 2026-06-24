"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { TiTick } from 'react-icons/ti';
import Image from 'next/image';

const TravelDealCard = () => {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex flex-col lg:flex-row gap-5">
                {/* Left card */}
                <div className="flex-1 bg-gradient-to-br from-[#d1d1e9] to-[#e0e7ff] dark:from-[#242629] dark:to-[#2d2f3d] border border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-6 shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl sm:text-2xl text-[#2b2c34] dark:text-[#fffffe] font-bold italic mb-5">
                        {t("home.travel_deal_text_1")}
                    </h2>
                    <div className="space-y-3">
                        {[
                            t("home.travel_deal_text_2"),
                            null,
                            t("home.travel_deal_text_4"),
                        ].map((text, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <div className="mt-0.5 w-5 h-5 rounded-full bg-[#6246ea]/10 flex items-center justify-center flex-shrink-0">
                                    <TiTick className="text-[#6246ea]" size={14} />
                                </div>
                                <p className="text-[#2b2c34] dark:text-[#94a1b2] italic text-sm">
                                    {i === 1 ? (
                                        <>
                                            {t("home.travel_deal_text_3")}{" "}
                                            <span className="font-bold text-[#e45858] dark:text-[#7f5af0]">
                                                {t("home.travel_deal_price")}
                                            </span>
                                        </>
                                    ) : text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right card */}
                <div className="flex-1 bg-gradient-to-br from-[#d1d1e9] to-[#e0e7ff] dark:from-[#242629] dark:to-[#2d2f3d] border border-gray-200 dark:border-gray-700 rounded-2xl px-6 py-6 shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 h-full">
                        {/* Image - mobile only */}
                        <div className="md:hidden w-full">
                            <Image
                                className="w-full h-[160px] object-cover rounded-xl shadow-sm"
                                width={500}
                                height={300}
                                src="/images/discount.jpg"
                                alt="Ưu đãi du lịch"
                            />
                        </div>

                        {/* Text */}
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-lg sm:text-xl text-[#2b2c34] dark:text-[#fffffe] font-semibold mb-2">
                                {t("home.travel_deal_text_5")}
                            </h3>
                            <p className="text-[#2b2c34] dark:text-[#94a1b2] mb-5 text-sm leading-relaxed">
                                {t("home.travel_deal_text_6")}{" "}
                                <span className="font-bold text-[#e45858] dark:text-[#7f5af0]">
                                    {t("home.travel_deal_discount")}
                                </span>{" "}
                                {t("home.travel_deal_text_7")}
                            </p>
                            <button className="w-full md:w-auto px-6 py-2.5 bg-[#6246ea] hover:bg-[#5135c8] text-white rounded-full font-semibold shadow-md shadow-purple-300 dark:shadow-purple-900/30 transition-all duration-200 hover:scale-105 cursor-pointer">
                                {t("home.travel_deal_button")}
                            </button>
                        </div>

                        {/* Image - desktop */}
                        <div className="hidden md:block flex-shrink-0">
                            <Image
                                className="w-[180px] h-[110px] object-cover rounded-xl shadow-md"
                                width={500}
                                height={300}
                                src="/images/discount.jpg"
                                alt="Ưu đãi du lịch"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelDealCard;
