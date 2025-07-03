import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '../helpers/exception.helper.js';
const prisma = new PrismaClient();

export const hotelService = {
    // Lấy danh sách vị trí
    getAllLocaltions: async function () {
        const locations = await prisma.location.findMany();
        return {
            locations: locations
        }

    },
    // Lấy danh sách khách sạn
    getAllHotels: async function () {
        const hotels = await prisma.hotel.findMany({
            include: {
                location: true,
                reviews: true,
                images: true,
                amenities: {
                    include: {
                        amenity: true
                    },
                }
            }
        });
        return {
            hotels: hotels
        }
    },
    // lấy thông tin khách sạn theo id
    getHotelById: async function (hotelId) {
        const hotel = await prisma.hotel.findUnique({
            where: { id: hotelId },
            include: {
                location: true,
                reviews: {
                    take: 3,
                    orderBy: { create_At: "desc" },
                    include: {
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                avatar: true
                            }
                        }
                    }
                },
                images: true,
                amenities: {
                    include: {
                        amenity: true
                    },
                }
            }
        });
        if (!hotel) {
            throw new NotFoundException("Khách sạn không tồn tại");
        }
        return {
            hotel: hotel
        }
    },
    // Lấy khách sạn liên quan tới khu vực
    getHotelsByLocation: async function (locationId) {
        const hotels = await prisma.hotel.findMany({
            where: { locationId: locationId },
            include: {
                location: true,
                images: true,
                amenities: {
                    include: {
                        amenity: true
                    },
                }
            }
        });
        if (!hotels || hotels.length === 0) {
            throw new NotFoundException("Không có khách sạn nào ở vị trí này");
        }
        return {
            hotels: hotels
        }
    },
    // Lấy những khách sạn liên quan tới địa điểm và nhận phòng trả phòng và số người
    getSearchAvailableHotels: async function (data) {
        const { locationId, checkIn, checkOut, guests } = data;
        const parsedLocationId = parseInt(locationId);
        const parsedGuests = parseInt(guests);

        const rooms = await prisma.room.findMany({
            where: {
                maxGuests: {
                    gte: parsedGuests
                },
                hotel: {
                    locationId: parsedLocationId
                },
                bookings: {
                    none: {
                        OR: [
                            {
                                checkIn: { lte: new Date(checkOut) },
                                checkOut: { gte: new Date(checkIn) }
                            }
                        ]
                    }
                }
            },
            include: {
                hotel: {
                    include: {
                        location: true,
                        images: true,
                    }
                }
            }
        });
        const hotelMap = new Map();
        for (const room of rooms) {
            hotelMap.set(room.hotel.id, room.hotel);
        }
        return {
            count: hotelMap.size,
            hotels: Array.from(hotelMap.values())
        }
    },
   // Lấy tất cả đánh giá của khách sạn đó 
    getAllReviewByHotelId: async function (hotelId) {
        const parsedHotelId = parseInt(hotelId)
        const reviews = await prisma.review.findMany({
            where: { hotelId: parsedHotelId },
            select: {
                comment: true,
                rating: true,
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        avatar: true
                    }
                }
            }
        })
        return {
            reviews: reviews
        }
    },
}