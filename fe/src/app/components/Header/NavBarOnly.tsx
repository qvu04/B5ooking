"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaSun, FaMoon, FaUserAlt } from "react-icons/fa";
import { MdTranslate } from "react-icons/md";
import { Select } from "antd";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { useSelector } from "react-redux";
import { setUserLogoutAction } from "@/redux/features/userSlice";
import toast from "react-hot-toast";
import { RootState } from "@/lib/store";
import { hideLoading, showLoading } from "@/redux/features/loadingSlice";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

const NavBarOnly = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const { i18n, t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathName = usePathname();
    const dispatch = useAppDispatch();
    const { user } = useSelector((state: RootState) => state.userSlice);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!mounted) return null;

    const handleLogout = () => {
        dispatch(showLoading());
        setTimeout(() => {
            dispatch(setUserLogoutAction());
            toast.success("Đăng xuất thành công");
            dispatch(hideLoading());
        }, 1000);
    };

    return (
        <nav
            className={`sticky top-0 z-50 w-full px-10 py-5 flex items-center justify-between transition-all duration-300 ${isScrolled
                ? "bg-white dark:bg-black dark:text-white text-black shadow-md"
                : "bg-black/30 dark:bg-black/30 dark:text-white backdrop-blur-md text-white"
                }`}
        >
            <Link href="/" className="flex items-center space-x-0">
                <img
                    src="/images/logo-b5ooking.png"
                    alt="logo"
                    className="w-[200px] h-[80px] object-contain"
                />
                <span className="text-2xl md:text-3xl font-bold text-[#6246ea] -ml-10">
                    B5ooking
                </span>
            </Link>

            <nav className="hidden md:flex space-x-6">
                {["/", "/blog", "/about"].map((href, index) => {
                    const isActive = pathName === href;
                    const labels = [t("home.button_header_home"), t("home.button_header_article"), t("home.button_header_about")];
                    const icons = ["/images/home.png", "/images/article.png", "/images/about.png"];
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`group relative flex items-center gap-1 transition-all duration-300 ${isActive ? "text-[#6246ea] scale-[1.05]" : "hover:text-[#6246ea]"
                                }`}
                        >
                            <img
                                className={`w-6 h-6 object-cover rounded-sm transition-transform duration-300 ${isActive ? "scale-125" : "group-hover:scale-110"
                                    }`}
                                src={icons[index]}
                                alt={labels[index]}
                            />
                            <span className="font-medium">{labels[index]}</span>
                            <span
                                className={`absolute left-0 -bottom-1 h-[2px] bg-[#6246ea] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            />
                        </Link>
                    );
                })}
            </nav>

            <div className="flex items-center space-x-4">
                <button
                    onClick={() => {
                        dispatch(showLoading());
                        setTimeout(() => {
                            setTheme(resolvedTheme === "dark" ? "light" : "dark");
                            dispatch(hideLoading());
                        }, 500); // thời gian loading 0.5s
                    }}
                    className="text-xl hover:text-[#6246ea] transition"
                >
                    {resolvedTheme === "dark" ? <FaSun /> : <FaMoon />}
                </button>
                <div className="flex items-center gap-1">
                    <MdTranslate className="text-xl" />
                    <Select
                        value={i18n.language}
                        onChange={(val) => i18n.changeLanguage(val)}
                        className="w-[130px] text-white dark:text-white"
                        suffixIcon={null}
                        popupMatchSelectWidth={false}
                        options={[
                            { value: "vi", label: "🇻🇳 Tiếng Việt" },
                            { value: "en", label: "🇺🇸 English" },
                        ]}
                    />
                </div>

                {user ? (
                    <>
                        <Link href={user?.role === "admin" ? "/admin" : "/profile"} className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {user?.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
                                        <FaUserAlt className="text-sm" />
                                    </div>
                                )}
                                <span className="text-sm font-medium">{user?.fullName}</span>
                            </div>
                        </Link>

                        {/* Alert Dialog Đăng xuất */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button className="px-3 py-1.5 cursor-pointer rounded-xl bg-[#6246ea] hover:bg-[#5135c8] text-white font-medium transition">
                                    {t("home.button_header_signout")}
                                </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Bạn có chắc chắn muốn đăng xuất?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Hành động này sẽ đăng xuất bạn khỏi hệ thống.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleLogout}>Đăng xuất</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                ) : (
                    <button
                        onClick={() => {
                            dispatch(showLoading());
                            setTimeout(() => {
                                router.push("/login");
                                dispatch(hideLoading());
                            }, 2000);
                        }}
                        className="ml-2 px-4 py-1.5 cursor-pointer rounded-xl bg-[#6246ea] hover:bg-[#5135c8] text-white font-medium transition"
                    >
                        {t("home.button_header_signin")}
                    </button>
                )}
            </div>
        </nav>
    );
};

export default NavBarOnly;
