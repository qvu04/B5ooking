import React from 'react'

const PlanBanner = () => {
    return (
        <div className="bg-[#d1d1e9] border-gray-300 rounded-2xl shadow-lg p-6 md:p-12 my-10 mx-4 md:mx-auto max-w-6xl">
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
    )
}

export default PlanBanner