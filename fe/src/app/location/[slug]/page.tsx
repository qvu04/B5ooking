// src/app/location/[slug]/page.tsx
import { getSomeLocation } from '@/app/api/locationService';
import { getHotelsByLocation } from '@/app/api/hotelService';
import { Hotels } from '@/app/types/hotelTypes';
import { Locations } from '@/app/types/locationTypes';
import slugify from 'slugify';

type Props = {
    params: { slug: string };
};

export default async function LocationPage({ params }: Props) {
    const { slug } = params;

    const res = await getSomeLocation();
    const locations: Locations[] = res.data.data.locations;

    const matchedLocation = locations.find(
        (loc) => slugify(loc.city, { lower: true }) === slug
    );

    if (!matchedLocation) {
        return <div className="p-6 text-red-500">Không tìm thấy địa điểm</div>;
    }

    const hotelRes = await getHotelsByLocation(matchedLocation.id);
    const hotels: Hotels[] = hotelRes.data.data.hotels;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Khách sạn tại {matchedLocation.city}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                    <div key={hotel.id} className="border rounded-lg overflow-hidden shadow-md">
                        <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="object-cover w-full h-48"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{hotel.name}</h2>
                            <p className="text-sm text-gray-500">{hotel.address}</p>
                            <p className="text-sm mt-2">{hotel.description}</p>
                            <div className="text-yellow-500 mt-1">
                                ★ {hotel.averageRating || hotel.defaultRating}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
