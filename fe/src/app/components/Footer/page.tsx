'use client';
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaArrowUp } from 'react-icons/fa';
import { MdTranslate } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const Footer = () => {
    const { i18n, t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');
    };

    useEffect(() => {
        const handleScroll = () => setShowButton(window.scrollY > 200);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 mt-20 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Col 1: Logo + desc + lang */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <Link href="/" className="flex items-center gap-2 mb-3">
                        <img src="/images/logo-b5ooking.png" alt="logo" className="w-14 h-14 object-contain" />
                        <span className="text-2xl font-bold text-[#6246ea] leading-tight">B5ooking</span>
                    </Link>
                    <p className="text-sm leading-relaxed">{t("home.footer_text_1")}</p>
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 mt-4 text-sm text-gray-600 dark:text-gray-400 hover:text-[#6246ea] dark:hover:text-[#6246ea] transition-colors duration-200"
                    >
                        <MdTranslate className="text-lg" />
                        {i18n.language === 'vi' ? 'Tiếng Việt' : 'English'}
                    </button>
                </div>

                {/* Col 2: Navigation */}
                <div className="text-center sm:text-left">
                    <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">{t("home.footer_text_2")}</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-[#6246ea] transition-colors duration-200">{t("home.footer_text_3")}</a></li>
                        <li><a href="/places" className="hover:text-[#6246ea] transition-colors duration-200">{t("home.footer_text_4")}</a></li>
                        <li><a href="/offers" className="hover:text-[#6246ea] transition-colors duration-200">{t("home.footer_text_5")}</a></li>
                        <li><a href="/about" className="hover:text-[#6246ea] transition-colors duration-200">{t("home.footer_text_6")}</a></li>
                    </ul>
                </div>

                {/* Col 3: Support */}
                <div className="text-center sm:text-left">
                    <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">{t("home.footer_text_7")}</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/support" className="hover:text-[#6246ea] transition-colors duration-200">{t("home.footer_text_8")}</a></li>
                        <li><a href="/policy" className="hover:text-[#6246ea] transition-colors duration-200">{t("home.footer_text_9")}</a></li>
                        <li><a href="/contact" className="hover:text-[#6246ea] transition-colors duration-200">{t("home.footer_text_10")}</a></li>
                        <li><a href="/faq" className="hover:text-[#6246ea] transition-colors duration-200">{t("home.footer_text_11")}</a></li>
                    </ul>
                </div>

                {/* Col 4: Social */}
                <div className="text-center sm:text-left">
                    <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">{t("home.footer_text_12")}</h4>
                    <div className="flex gap-4 mt-2 text-xl justify-center sm:justify-start">
                        <a href="#" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all duration-200">
                            <FaFacebookF size={14} />
                        </a>
                        <a href="#" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-pink-500 hover:text-white dark:hover:bg-pink-500 transition-all duration-200">
                            <FaInstagram size={14} />
                        </a>
                        <a href="#" aria-label="Youtube" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 transition-all duration-200">
                            <FaYoutube size={14} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} B5ooking. {t("home.footer_text_13")}
            </div>

            {showButton && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="cursor-pointer fixed bottom-6 right-6 p-3 bg-[#6246ea] text-white rounded-full shadow-lg hover:bg-[#5135c8] hover:scale-110 transition-all duration-300"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp />
                </button>
            )}
        </footer>
    );
};

export default Footer;
