'use client';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('./MapView'), {
    ssr: false,
    loading: () => <p>Đang tải bản đồ...</p>,
});

export default MapView;
