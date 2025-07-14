import { getSomeLocation } from '@/app/api/locationService';
import { getHotelsByLocation } from '@/app/api/hotelService';
import { Hotels } from '@/app/types/hotelTypes';
import { Locations } from '@/app/types/locationTypes';
import { toSlug } from '@/utils/slug';
import MapByCity from '@/app/components/Map/MapByCity';
import HotelListClient from './HotelList';

type Props = {
    params: { slug: string };
};

export default async function LocationPage({ params }: Props) {
    const { slug } = params;
    const res = await getSomeLocation();
    const locations: Locations[] = res.data.data.locations;

    const matchedLocation = locations.find((loc) => toSlug(loc.city) === slug);

    if (!matchedLocation) {
        return <div className="p-6 text-red-500">Không tìm thấy địa điểm</div>;
    }

    const hotelRes = await getHotelsByLocation(matchedLocation.id);
    const hotels: Hotels[] = hotelRes.data.data.hotels;

    return (
        <div>
            <div className="text-center text-2xl font-bold mt-6">
                Khách sạn ở {matchedLocation.city} - Hiện tại có {hotels.length} chỗ ở
            </div>

            <div className="flex max-w-[2000px] mx-auto px-4 relative mt-6">
                {/* Danh sách khách sạn (client component) */}
                <HotelListClient hotels={hotels} />

                {/* Bản đồ */}
                <div className="hidden lg:block w-full lg:w-[30%] sticky top-20 h-[calc(100vh-100px)]">
                    <div className="rounded-2xl overflow-hidden shadow-lg h-full">
                        <MapByCity city={matchedLocation.city} />
                    </div>
                </div>
            </div>
        </div>
    );
}
