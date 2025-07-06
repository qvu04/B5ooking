'use client';

import { usePathname } from 'next/navigation';
import Header from '../Header/page';
import Footer from '../Footer/page';


export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hiddenLayout = ['/login', '/register', '/admin'];

    const shouldHideLayout = hiddenLayout.some(path => pathname.startsWith(path));

    return (
        <>
            {!shouldHideLayout && <Header />}
            {children}
            {!shouldHideLayout && <Footer />}
        </>
    );
}
