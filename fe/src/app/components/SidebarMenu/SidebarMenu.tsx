'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUser, FaSuitcase, FaHeart } from 'react-icons/fa';
import { MdBedroomParent } from "react-icons/md";

const menuItems = [
    { label: 'Giới thiệu bản thân', icon: <FaUser />, href: '/profile' },
    { label: 'Danh sách đặt phòng', icon: <FaSuitcase />, href: '/profile/booking' },
    { label: 'Danh sách yêu thích', icon: <FaHeart />, href: '/profile/favorite' },
    { label: 'Danh sách phòng bạn đã ở', icon: <MdBedroomParent />, href: '/profile/room' }
];

export default function SidebarMenu() {
    const pathname = usePathname();

    return (
        <aside className="w-64 p-6 border-r min-h-screen bg-white dark:bg-zinc-900 dark:border-zinc-700">
            <h2 className="text-2xl font-bold mb-8 text-black dark:text-white">Hồ sơ</h2>
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
