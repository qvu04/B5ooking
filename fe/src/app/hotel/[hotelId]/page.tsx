// app/hotel/[hotelId]/page.tsx
import { getHotelsbyHotelId } from '@/app/api/hotelService';
import { Hotels } from '@/app/types/hotelTypes';
import HotelDetailClient from './HotelDetail';


type Props = {
    params: { hotelId: string };
};

export default async function HotelDetailPage({ params }: Props) {
    const res = await getHotelsbyHotelId(Number(params.hotelId));
    console.log(res.data);
    const hotel: Hotels = res.data.data;

    return (
        <HotelDetailClient hotel={hotel} />
    );
}
