'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUser, FaSuitcase } from 'react-icons/fa';
import { MdBedroomParent, MdMeetingRoom } from 'react-icons/md';

const menuItems = [
    { label: 'Quản lý người dùng', icon: <FaUser />, href: '/admin/users' },
    { label: 'Quản lý khách sạn', icon: <FaSuitcase />, href: '/admin/hotels' },
    { label: 'Quản lý chỗ ở', icon: <MdMeetingRoom />, href: '/admin/rooms' },
    { label: 'Quản lý đặt phòng', icon: <MdBedroomParent />, href: '/admin/bookings' }
];

export default function SidebarMenuAdmin() {
    const pathname = usePathname();

    return (
        <aside className="w-64 p-6 border-r min-h-screen bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-md">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 mb-10">
                <img
                    src="/images/logo-b5ooking.png"
                    alt="logo"
                    className="w-[80px] h-[60px] object-contain"
                />
                <span className="text-2xl font-extrabold text-[#6246ea] tracking-tight">
                    B5ooking
                </span>
            </Link>

            {/* Menu */}
            <ul className="space-y-2">
                {menuItems.map(item => {
                    const isActive = pathname === item.href;
                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 group
                                    ${isActive
                                        ? 'bg-[#6246ea] text-white shadow-md'
                                        : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:shadow-sm'
                                    }`}
                            >
                                <span className={`text-xl transition-all duration-200
                                    ${isActive ? 'text-white' : 'text-[#6246ea] group-hover:text-[#6246ea]'}`}>
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
