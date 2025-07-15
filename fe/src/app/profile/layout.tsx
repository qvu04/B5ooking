import React from 'react';
import SidebarMenu from '../components/SidebarMenu/SidebarMenu';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar trái */}
            <aside className="w-[280px] p-6 border-r bg-white min-h-screen">
                <SidebarMenu />
            </aside>

            {/* Nội dung phải */}
            <main className="flex-1 p-8 bg-gray-50 max-w-screen-xl mx-auto">
                {children}
            </main>
        </div>
    );
}
