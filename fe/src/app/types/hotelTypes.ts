export interface Hotels {
    id: number;
    name: string;
    address: string;
    description: string;
    image: string;
    averageRating: number;
    defaultRating: number;
    images: { imageUrl: string }[];
    amenities: {
        amenity: {
            name: string
        }
    }[];
    latitude?: number;
    longitude?: number;
}   