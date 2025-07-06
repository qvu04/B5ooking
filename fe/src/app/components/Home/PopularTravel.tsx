'use client';
import Link from 'next/link';
import React from 'react';

const PopularTravel = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-[#2b2c34] dark:text-[#fffffe] mb-6">Đi nhiều hơn chi ít hơn</h2>

            {/* Box Đăng nhập */}
            <div className="bg-[#d1d1e9] dark:bg-[#242629] border border-gray-300 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h3 className="text-lg text-[#2b2c34] dark:text-[#fffffe] font-semibold mb-1">Đăng nhập để tiết kiệm</h3>
                    <p className="text-[#2b2c34] dark:text-[#94a1b2]">
                        Chỉ cần đăng ký để tiết kiệm <span className="text-[#e45858] dark:text-[#7f5af0] font-semibold">10%</span> trở lên ở những chỗ nghỉ có tham gia
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link href="/login" className="bg-[#6246ea]  hover:bg-[#5135c8] cursor-pointer text-white px-5 py-2 rounded-full text-sm font-medium transition">
                        Đăng Nhập
                    </Link>
                    <Link href="/register" className="border border-[#6246ea] text-[#6246ea] cursor-pointer hover:bg-gray-100 px-5 py-2 rounded-full text-sm font-medium transition">
                        Đăng Ký
                    </Link>
                </div>
            </div>

            {/* Grid lợi ích */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Item 1 */}
                <div className="bg-[#d1d1e9] dark:bg-[#242629] border border-gray-300 rounded-xl p-6 shadow-sm text-center ">
                    <img src="/images/calendar.png" alt="calendar" className="w-15 h-15 mx-auto mb-4" />
                    <h4 className="font-semibold text-[#2b2c34] dark:text-[#fffffe] text-base mb-2">Đặt ngay bây giờ thanh toán tại chỗ nghỉ</h4>
                    <p className="text-sm text-[#2b2c34] dark:text-[#94a1b2]">
                        <span className="text-[#e45858] dark:text-[#7f5af0] font-semibold">MIỄN PHÍ</span> hủy cho hầu hết các phòng
                    </p>
                </div>

                {/* Item 2 */}
                <div className="bg-[#d1d1e9] dark:bg-[#242629] border border-gray-300 rounded-xl p-6 shadow-sm text-center ">
                    <img src="/images/world.png" alt="world" className="w-12 h-15 mx-auto mb-4" />
                    <h4 className="font-semibold text-[#2b2c34] dark:text-[#fffffe] text-base mb-2">Hơn 2 triệu chỗ nghỉ toàn cầu</h4>
                    <p className="text-sm text-[#2b2c34] dark:text-[#94a1b2]">Khách sạn, guest house, căn hộ và nhiều loại chỗ ở khác…</p>
                </div>

                {/* Item 3 */}
                <div className="bg-[#d1d1e9] dark:bg-[#242629] border border-gray-300 rounded-xl p-6 shadow-sm text-center ">
                    <img src="/images/hotline.png" alt="hotline" className="w-15 h-15 mx-auto mb-4" />
                    <h4 className="font-semibold text-[#2b2c34] dark:text-[#fffffe] text-base mb-2">Dịch vụ khách hàng đáng tin cậy, hoạt động 24/7</h4>
                    <p className="text-sm text-[#2b2c34] dark:text-[#94a1b2]">Chúng tôi luôn sẵn sàng giúp đỡ bạn</p>
                </div>
            </div>
        </div>
    );
};

export default PopularTravel;
