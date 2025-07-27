'use client';

import { t } from 'i18next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUser, FaSuitcase, FaHeart } from 'react-icons/fa';
import { MdBedroomParent } from "react-icons/md";

export default function SidebarMenu() {
    const pathname = usePathname();
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, [])
    if (!mounted) {
        return null;
    }
    const menuItems = [
        { label: t("profile.label_1"), icon: <FaUser />, href: '/profile' },
        { label: t("profile.label_2"), icon: <FaSuitcase />, href: '/profile/booking' },
        { label: t("profile.label_3"), icon: <FaHeart />, href: '/profile/favorite' },
        { label: t("profile.label_4"), icon: <MdBedroomParent />, href: '/profile/room' }
    ];
    return (
        <aside className="w-64 p-6 border-r min-h-screen bg-white dark:bg-zinc-900 dark:border-zinc-700">
            <h2 className="text-2xl font-bold mb-8 text-black dark:text-white">{t("profile.text_1")}</h2>
            <ul className="space-y-4">
                {menuItems.map(item => {
                    const isActive = pathname === item.href;
                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 p-3 rounded-lg transition
                                    ${isActive
                                        ? 'bg-black text-white dark:bg-white dark:text-black'
                                        : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white'
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
