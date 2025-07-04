import React from 'react'
import { TiTick } from 'react-icons/ti';

const TravelDealCard = () => {
    return (
        <div className=" flex justify-around items-center px-6 py-10">
            {/* Tiêu đề chính */}
            <div className="mb-6 bg-[#d1d1e9]  border border-gray-300 rounded-2xl px-8 py-6 shadow-md">
                <h2 className="text-2xl text-[#2b2c34] font-bold italic mb-1">Ưu Đãi</h2>
                <div className="flex items-center">
                    <TiTick />
                    <p className="text-[#2b2c34] italic">
                        Khuyến mãi, giảm giá và ưu đãi đặc biệt dành riêng cho bạn
                    </p>
                </div>
                <div className="flex items-center">
                    <TiTick />
                    <p className="text-[#2b2c34] italic">Mua với giá trên <span className="font-semibold text-[#e45858]"> 10.000.000đ</span></p>
                </div>
                <div className="flex  items-center">
                    <TiTick />
                    <p className="text-[#2b2c34] italic">
                        Với nhiều ưu đãi hấp dẫn giúp bạn trải nghiệm tốt hơn
                    </p>

                </div>
            </div>

            {/* Nội dung ưu đãi */}
            <div>
                <div className="flex items-center justify-between gap-6 bg-[#d1d1e9] border border-gray-300 rounded-2xl px-8 py-6 shadow-md max-w-5xl mx-auto">
                    {/* Text bên trái */}
                    <div className="flex-1">
                        <h3 className="text-lg text-[#2b2c34] font-semibold mb-2">Kỳ nghỉ ngắn ngày chất lượng</h3>
                        <p className="text-[#2b2c34] mb-4">
                            Tiết kiệm đến <span className="font-semibold text-[#e45858]">20%</span> với Ưu Đãi Mùa Du Lịch
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
    )
}

export default TravelDealCard