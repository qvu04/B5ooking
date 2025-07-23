import SidebarMenuAdmin from '../components/SidebarMenu/SidebarMenuAdmin';
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar trái */}
            <aside className="w-[280px] p-6 border-r bg-white dark:bg-zinc-900 min-h-screen">
                <SidebarMenuAdmin />
            </aside>

            {/* Nội dung phải */}
            <main className="flex-1 p-8 bg-gray-50 max-w-screen-xl mx-auto">
                {children}
            </main>
        </div>
    )
}