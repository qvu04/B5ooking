import Link from 'next/link';
// app/about/page.tsx
export default function AboutPage() {
    const data = [
        {
            title: "Đội ngũ chuyên nghiệp, tâm huyết",
            desc: "Chúng tôi có đội ngũ nhân viên kinh nghiệm, tận huyết, luôn lắng nghe những thắc mắc, kịp thời kết nối khách hàng qua hotline, fanpage được kết nối liên tục..."
        },
        {
            title: "Sản phẩm phong phú",
            desc: "Tại website chính thức của chúng tôi: https://b5ooking.com, du khách có thể dễ dàng khám phá và lựa chọn những ưu đãi hấp dẫn, chuyến bay khởi hành tiện lợi..."
        },
        {
            title: "Mức giá hấp dẫn",
            desc: "B5ooking.com cam kết sẽ đem đến các dịch vụ chất lượng với mức giá tối thiểu. Ngoài ra còn có nhiều khuyến mãi định kỳ hấp dẫn trên website."
        },
        {
            title: "Bảo mật thông tin",
            desc: "Chúng tôi cam kết toàn bộ mọi thông tin cá nhân của khách hàng sẽ được giữ bí mật tuyệt đối. Quý khách có thể yên tâm trải nghiệm dịch vụ."
        }
    ]
    return (
        <div>
            {/* tên và logo */}
            <div className="pt-10 text-center ">
                <Link href="/" className="flex items-center justify-center">
                    <img
                        src="/images/logo-b5ooking.png"
                        alt="logo"
                        className="w-[150px] h-[80px] object-contain mb-2"
                    />
                    <span className="text-3xl md:text-4xl font-bold ">
                        <span className='text-[#6246ea]'>B5ooking</span> - Về chúng tôi
                    </span>
                </Link>
            </div>
            {/* Content chính */}
            <div className="relative z-10 px-4 md:px-10 pt-8 text-gray-800">
                {/* 1. Giới thiệu */}
                <section className="mb-12 bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-2xl text-[#2b2c34] font-bold mb-4">1. Chúng tôi là <span className="text-[#6246ea]">B5ooking</span></h2>
                    <p className="text-lg text-[#2b2c34] leading-relaxed">
                        B5ooking.com là sản phẩm chính thức của Công ty TNHH Du lịch và Dịch vụ B5ooking.com. Với niềm đam mê khám phá và yêu thích du lịch,
                        chúng tôi đã tạo nên một nền tảng nơi khách hàng có thể dễ dàng tìm kiếm và lựa chọn những kỳ nghỉ lý tưởng cho bản thân và người thân.
                        B5ooking.com tuyển chọn kỹ lưỡng các du thuyền, khách sạn và hợp tác với các hãng hàng không uy tín để mang đến dịch vụ đa dạng và chất
                        lượng nhất cho du khách.
                    </p>
                </section>

                {/* 2. Tại sao chọn */}
                <section className="mb-12">
                    <h2 className="text-2xl text-[#2b2c34] font-bold mb-6">2. Tại sao chọn chúng tôi?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.map((item, index) => (
                            <div key={index} className="bg-[#d1d1e9] p-6 rounded-xl shadow-sm">
                                <h3 className="text-xl font-semibold mb-2 text-[#e45858]">{item.title}</h3>
                                <p className="text-[#2b2c34]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Dịch vụ */}
                <section className="mb-12 bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-2xl text-[#2b2c34] font-bold mb-4">3. Sản phẩm dịch vụ</h2>
                    <ul className="list-disc text-[#2b2c34] pl-6 space-y-2 text-lg">
                        <li>Đặt vé máy bay nội địa và quốc tế từ các hãng hàng không uy tín</li>
                        <li>Dịch vụ du thuyền Hạ Long với nhiều phân khúc, phù hợp cho từng sở thích và ngân sách</li>
                        <li>Đặt phòng khách sạn, resort cao cấp đến tầm trung trên toàn quốc</li>
                        <li>Hỗ trợ các dịch vụ bổ trợ: thuê xe du lịch chất lượng cao, hướng dẫn viên chuyên nghiệp, làm visa, đặt vé tàu…</li>
                    </ul>
                </section>

                {/* 4. Liên hệ */}
                <section className="bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-2xl text-[#2b2c34] font-bold mb-4">4. Liên hệ với chúng tôi</h2>
                    <div className="text-lg text-[#2b2c34] leading-relaxed">
                        <p><strong>Công ty TNHH Du Lịch và Dịch Vụ 5anhemsiunhan</strong></p>
                        <p>Địa chỉ: 321 QL1A, Phan Đăng Lưu, Quận 12, HCM</p>
                        <p>Mã số doanh nghiệp: 0123456789 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 05/06/2023</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
