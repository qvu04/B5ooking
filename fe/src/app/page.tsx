"use client";
import { useEffect, useState } from "react";
import { getAllLocation } from "./api/locationService";
import { Locations } from "./types/locationTypes";
import { TiTick } from "react-icons/ti";
export default function Home() {
  const [locations, setLocations] = useState<Locations[] | null>(null);

  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        const res = await getAllLocation();
        console.log('✌️res --->', res.data);
        setLocations(res.data.data.locations);
      } catch (error) {
        console.log('✌️error --->', error);
      }
    };
    fetchAllLocations();
  }, []);

  return (
    <div className="p-6">
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

      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Điểm đến đang thịnh hành</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {locations?.map((location) => (
          <div
            key={location.id}
            className="relative group rounded-lg overflow-hidden shadow-md border"
          >
            <img
              src={location.imageLocation}
              alt={location.city}
              className="w-full h-48 object-cover transform duration-300 group-hover:scale-110"
            />

            {/* Overlay xuất hiện từ dưới lên */}
            <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center gap-2 mb-4">
                <img
                  className="w-5 h-5 object-cover rounded-sm"
                  src="/images/icon_co_VN.png"
                  alt="co_VN"
                />
                <h3 className="text-white text-lg font-semibold text-center">
                  {location.city}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[#d1d1e9] border rounded-2xl shadow-lg p-6 md:p-12 my-10 mx-4 md:mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

          {/* Left bubble-style box */}
          <div className="bg-[#e0e7ff] rounded-[100px] px-10 py-8 shadow-md text-center">
            <h2 className="text-xl md:text-2xl font-bold text-[#2b2c34] mb-4 leading-snug">
              Bạn ơi, lên kế hoạch<br />
              cho chuyến đi mơ ước nhé !!!
            </h2>
            <p className="text-sm md:text-base text-[#2b2c34] mb-6">
              Chọn điểm đến, xếp hành lý và bắt đầu hành trình thôi nào!
            </p>
            <button className="bg-[#6246ea] hover:bg-[#503ac7] text-[#fffffe] px-6 py-2 rounded-full text-sm font-semibold shadow transition">
              Khám phá ngay
            </button>
          </div>

          {/* Right image */}
          <div className="flex justify-center">
            <img
              src="/images/home_plan.png"
              alt="home plan"
              className="w-full max-w-sm object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
