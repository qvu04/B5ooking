import { RoomType } from "./roomType";

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
    reviewCount: number;
    rooms: RoomType[];
    reviews: {
        comment: string,
        rating: number,
        user: {
            avatar: string,
            fullName: string,
        }
    }[];
    ratingStats: {
        count: {
            1: number;
            2: number;
            3: number;
            4: number;
            5: number;
        },
        percentages: {
            1: number;
            2: number;
            3: number;
            4: number;
            5: number;
        };
    }
}   