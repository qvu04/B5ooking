'use client';

import { usePathname } from 'next/navigation';
import NavBarOnly from '../Header/NavBarOnly';
import HeaderBanner from '../Header/HeaderBanner';
import Footer from '../Footer/page';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const noHeaderRoutes = ['/login', '/register', '/admin', '/not-found'];
    const noBannerRoutes = ['/profile', '/about', '/blog']; // => KHÔNG hiện Banner
    const noFooterRoutes = ['/profile']; // => CHỈ ẩn Footer ở /profile

    const shouldHideHeader = noHeaderRoutes.some(path => pathname.startsWith(path));
    const shouldHideBanner = noBannerRoutes.some(path => pathname.startsWith(path));
    const shouldHideFooter = noFooterRoutes.some(path => pathname.startsWith(path));

    return (
        <>
            {!shouldHideHeader && <NavBarOnly />}
            {!shouldHideHeader && !shouldHideBanner && <HeaderBanner />}
            {children}
            {!shouldHideHeader && !shouldHideFooter && <Footer />}
        </>
    );
}
