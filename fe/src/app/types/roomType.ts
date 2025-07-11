import { AmenityType } from "./amenityType";

export interface RoomAmenity {
  id: number;
  roomId: number;
  amenityId: number;
  amenity: AmenityType;
}
export interface RoomType {
  name: string;
  type: string;
  price: number;
  discount: number;
  maxGuests: number;
  description: string;
  images: {
    id: number;
    imageUrl: string;

  }[];
  image: string;
  amenities: RoomAmenity[];
}

