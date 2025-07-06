'use client';
import React from 'react';

const PopularTravel = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-[#2b2c34] mb-6">Đi nhiều hơn chi ít hơn</h2>

            {/* Box Đăng nhập */}
            <div className="border rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h3 className="text-lg text-[#2b2c34] font-semibold mb-1">Đăng nhập để tiết kiệm</h3>
                    <p className="text-[#2b2c34]">
                        Chỉ cần đăng ký để tiết kiệm <span className="text-[#6246ea] font-semibold">10%</span> trở lên ở những chỗ nghỉ có tham gia
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-[#6246ea]  hover:bg-[#5135c8] text-white px-5 py-2 rounded-full text-sm font-medium transition">
                        Đăng Nhập
                    </button>
                    <button className="border border-[#6246ea] text-[#6246ea] hover:bg-gray-100 px-5 py-2 rounded-full text-sm font-medium transition">
                        Đăng Ký
                    </button>
                </div>
            </div>

            {/* Grid lợi ích */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Item 1 */}
                <div className="border rounded-xl p-6 shadow-sm text-center bg-white">
                    <img src="/images/calendar.png" alt="calendar" className="w-15 h-15 mx-auto mb-4" />
                    <h4 className="font-semibold text-[#2b2c34] text-base mb-2">Đặt ngay bây giờ thanh toán tại chỗ nghỉ</h4>
                    <p className="text-sm text-[#2b2c34]">
                        <span className="text-[#6246ea] font-semibold">MIỄN PHÍ</span> hủy cho hầu hết các phòng
                    </p>
                </div>

                {/* Item 2 */}
                <div className="border rounded-xl p-6 shadow-sm text-center bg-white">
                    <img src="/images/world.png" alt="world" className="w-12 h-15 mx-auto mb-4" />
                    <h4 className="font-semibold text-[#2b2c34] text-base mb-2">Hơn 2 triệu chỗ nghỉ toàn cầu</h4>
                    <p className="text-sm text-[#2b2c34]">Khách sạn, guest house, căn hộ và nhiều loại chỗ ở khác…</p>
                </div>

                {/* Item 3 */}
                <div className="border rounded-xl p-6 shadow-sm text-center bg-white">
                    <img src="/images/hotline.png" alt="hotline" className="w-15 h-15 mx-auto mb-4" />
                    <h4 className="font-semibold text-[#2b2c34] text-base mb-2">Dịch vụ khách hàng đáng tin cậy, hoạt động 24/7</h4>
                    <p className="text-sm text-[#2b2c34]">Chúng tôi luôn sẵn sàng giúp đỡ bạn</p>
                </div>
            </div>
        </div>
    );
};

export default PopularTravel;
