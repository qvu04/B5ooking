'use client';
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdTranslate } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const Footer = () => {
    const { i18n } = useTranslation();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true); // chỉ cho render ngôn ngữ khi đã mounted
    }, []);
    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');
    };

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 mt-20">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Cột 1: Logo + mô tả + chuyển đổi ngôn ngữ */}
                <div>
                    <Link href="/" className="flex items-center space-x-2 mb-2">
                        <img
                            src="/images/logo-b5ooking.png"
                            alt="logo"
                            className="w-20 h-20 object-contain"
                        />
                        <span className="text-2xl font-bold text-[#6246ea] leading-tight">
                            B5ooking
                        </span>
                    </Link>
                    <p className="text-sm">
                        Nền tảng đặt phòng trực tuyến nhanh chóng, tiện lợi và đáng tin cậy.
                    </p>

                    {/* Chuyển đổi ngôn ngữ */}
                    {mounted && (
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 mt-4 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition"
                        >
                            <MdTranslate className="text-lg" />
                            {i18n.language === 'vi' ? 'Tiếng Việt' : 'English'}
                        </button>
                    )}
                </div>

                {/* Cột 2: Điều hướng */}
                <div>
                    <h4 className="font-semibold mb-2">Điều hướng</h4>
                    <ul className="space-y-1 text-sm">
                        <li><a href="/" className="hover:text-[#6246ea]">Trang chủ</a></li>
                        <li><a href="/places" className="hover:text-[#6246ea]">Chỗ ở</a></li>
                        <li><a href="/offers" className="hover:text-[#6246ea]">Ưu đãi</a></li>
                        <li><a href="/about" className="hover:text-[#6246ea]">Giới thiệu</a></li>
                    </ul>
                </div>

                {/* Cột 3: Hỗ trợ */}
                <div>
                    <h4 className="font-semibold mb-2">Hỗ trợ</h4>
                    <ul className="space-y-1 text-sm">
                        <li><a href="/support" className="hover:text-[#6246ea]">Trung tâm trợ giúp</a></li>
                        <li><a href="/policy" className="hover:text-[#6246ea]">Chính sách hủy</a></li>
                        <li><a href="/contact" className="hover:text-[#6246ea]">Liên hệ</a></li>
                        <li><a href="/faq" className="hover:text-[#6246ea]">Câu hỏi thường gặp</a></li>
                    </ul>
                </div>

                {/* Cột 4: Mạng xã hội */}
                <div>
                    <h4 className="font-semibold mb-2">Kết nối với chúng tôi</h4>
                    <div className="flex gap-4 mt-2 text-xl">
                        <a href="#" className="hover:text-indigo-600"><FaFacebookF /></a>
                        <a href="#" className="hover:text-pink-600"><FaInstagram /></a>
                        <a href="#" className="hover:text-red-600"><FaYoutube /></a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} B5ooking. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
