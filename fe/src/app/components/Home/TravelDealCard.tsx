import React from 'react'
import { TiTick } from 'react-icons/ti';

const TravelDealCard = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Card bên trái */}
                <div className="flex-1 bg-[#d1d1e9] dark:bg-[#242629] border border-gray-300 rounded-2xl px-8 py-8 shadow-md flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl text-[#2b2c34] dark:text-[#fffffe] font-bold italic mb-4">Ưu Đãi</h2>
                        <div className="flex items-start mt-2">
                            <TiTick className="mt-1" />
                            <p className="ml-2 text-[#2b2c34] dark:text-[#94a1b2] italic">
                                Khuyến mãi, giảm giá và ưu đãi đặc biệt dành riêng cho bạn
                            </p>
                        </div>
                        <div className="flex items-start mt-2">
                            <TiTick className="mt-1" />
                            <p className="ml-2 text-[#2b2c34] dark:text-[#94a1b2] italic">
                                Mua với giá trên <span className="font-semibold text-[#e45858] dark:text-[#7f5af0]">10.000.000đ</span>
                            </p>
                        </div>
                        <div className="flex items-start mt-2">
                            <TiTick className="mt-1" />
                            <p className="ml-2 text-[#2b2c34] dark:text-[#94a1b2] italic">
                                Với nhiều ưu đãi hấp dẫn giúp bạn trải nghiệm tốt hơn
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card bên phải */}
                <div className="flex-1 bg-[#d1d1e9] dark:bg-[#242629] border border-gray-300 rounded-2xl px-8 py-8 shadow-md flex flex-col justify-between">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 h-full">
                        {/* Text bên trái */}
                        <div className="flex-1">
                            <h3 className="text-lg text-[#2b2c34] dark:text-[#fffffe] font-semibold mb-2">
                                Kỳ nghỉ ngắn ngày chất lượng
                            </h3>
                            <p className="text-[#2b2c34] dark:text-[#94a1b2] mb-4">
                                Tiết kiệm đến <span className="font-semibold text-[#e45858] dark:text-[#7f5af0]">20%</span> với Ưu Đãi Mùa Du Lịch
                            </p>
                            <button className="px-5 py-2 bg-[#6246ea] hover:bg-[#5135c8] text-[#fffffe] rounded-full font-semibold shadow-md transition-all cursor-pointer">
                                Săn Ngay
                            </button>
                        </div>

                        {/* Hình ảnh bên phải */}
                        <div className="flex-shrink-0">
                            <img
                                className="w-[180px] h-[100px] object-cover rounded-md shadow-sm"
                                src="/images/discount.jpg"
                                alt="Ưu đãi du lịch"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TravelDealCard