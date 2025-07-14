import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { BadrequestException, ConflictException, NotFoundException } from "../helpers/exception.helper.js";
const prisma = new PrismaClient()
export const userService = {
    updateProfile: async function (userId, data, avatarPath) {

        const { firstName, lastName, password, gender, phone, dateOfBirth, address } = data;
        const updateData = {}

        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (avatarPath) updateData.avatar = avatarPath;
        if (gender) updateData.gender = gender;
        if (phone) updateData.phone = phone;
        if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
        if (address) updateData.address = address;
        if (password) updateData.password = await bcrypt.hash(password, 10)

        if (firstName || lastName) {
            const user = await prisma.user.findUnique({ where: { id: userId } });
            updateData.fullName = `${firstName || user.firstName} ${lastName || user.lastName}`;
        }

        const updateUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                fullName: true,
                avatar: true,
                gender: true,
                phone: true,
                dateOfBirth: true,
                address: true,
                update_At: true
            }
        })

        return {
            updateUser: updateUser
        };
    },

    bookingRoom: async function (userId, data) {
        const { roomId, checkIn, checkOut, guests } = data;

        const parsedCheckIn = new Date(checkIn);
        const parsedCheckOut = new Date(checkOut);
        const now = new Date();
        const oneDay = 1000 * 60 * 60 * 24;
        const nights = Math.ceil((parsedCheckOut - parsedCheckIn) / oneDay);
        if (nights <= 0) {
            throw new BadrequestException("Ngày trả phòng phải sau ngày nhận phòng");
        }

        const existingBooking = await prisma.booking.findFirst({
            where: {
                roomId: roomId,
                status: { in: ['PENDING', 'CONFIRMED'] },
                checkOut: { gt: now },
                OR: [
                    {
                        checkIn: { lte: parsedCheckOut },
                        checkOut: { gte: parsedCheckIn }
                    }
                ]
            }
        });

        if (existingBooking) {
            throw new ConflictException("Phòng đã được đặt trong thời gian này.")
        }

        const room = await prisma.room.findUnique({
            where: {
                id: roomId
            }
        });

        if (!room) {
            throw new NotFoundException("Không tìm thấy phòng")
        }

        const pricePerNight = room.discount
            ? Math.round(room.price * (1 - room.discount / 100))
            : room.price;

        const totalPrice = nights * pricePerNight
        if (guests > room.maxGuests) {
            throw new BadrequestException(`Phòng chỉ cho phép tối đa ${room.maxGuests} người.`);
        }
        const newBooking = await prisma.booking.create({
            data: {
                userId: userId,
                roomId: roomId,
                checkIn: parsedCheckIn,
                checkOut: parsedCheckOut,
                totalPrice: totalPrice,
                guests: guests,
                status: 'PENDING'
            },
            include: {
                user: true,
                room: {
                    include: {
                        hotel: true
                    }
                }
            }
        });

        return {
            nights: nights,
            newBooking: newBooking
        }
    },
    confirmBooking: async function (userId, bookingId) {
        const booking = await prisma.booking.findUnique({ where: { id: parseInt(bookingId) } })
        if (!booking || booking.userId !== userId) {
            throw new NotFoundException("Không tìm thấy đơn đặt")
        }
        if (booking.status !== 'PENDING') {
            throw new BadrequestException("Chỉ xác nhận đơn chờ")
        }

        const confirmBooking = await prisma.booking.update({
            where: { id: parseInt(bookingId) },
            data: {
                status: 'CONFIRMED'
            }
        })
        return {
            confirmBooking: confirmBooking
        }

    },
    cancelBooking: async function (userId, bookingId) {
        const booking = await prisma.booking.findUnique({ where: { id: parseInt(bookingId) } })
        if (!booking || booking.userId !== userId) {
            throw new NotFoundException("Không tìm thấy đơn để hủy")
        }
        if (booking.status === 'CANCELED') throw new BadrequestException("Đã bị hủy trước đó");
        if (booking.status !== "PENDING") throw new BadrequestException("Chỉ huỷ đơn đang chờ");
        const cancelBooking = await prisma.booking.update({
            where: { id: parseInt(bookingId) },
            data: {
                status: 'CANCELED'
            }
        })
        return {
            cancelBooking: cancelBooking
        }
    },
    getBookingByStatus: async (userId, status) => {
        const whereClause = { userId };

        if (status) {
            whereClause.status = status;
        } else {
            whereClause.status = {
                not: "FINISHED"
            };
        }

        const bookings = await prisma.booking.findMany({
            where: whereClause,
            orderBy: { create_At: "desc" },
            include: {
                room: {
                    include: {
                        hotel: true
                    }
                }
            }
        });

        // ✅ Thêm nights, pricePerNight, totalPrice cho từng đơn
        const bookingsWithDetails = bookings.map((booking) => {
            const checkIn = new Date(booking.checkIn);
            const checkOut = new Date(booking.checkOut);
            const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

            const basePrice = booking.room.price;
            const discount = booking.room.discount || 0;
            const pricePerNight = Math.round(basePrice * (1 - discount / 100));
            const totalPrice = nights * pricePerNight;

            return {
                ...booking,
                nights,
                pricePerNight,
                calculatedTotalPrice: totalPrice
            };
        });

        return { bookings: bookingsWithDetails };
    },
    getFinishedBookings: async (userId) => {
        const bookings = await prisma.booking.findMany({
            where: {
                userId,
                status: "FINISHED"
            },
            orderBy: { create_At: "desc" },
            include: {
                room: {
                    include: {
                        hotel: true
                    }
                }
            }
        });


        const withDetails = bookings.map((booking) => {
            const checkIn = new Date(booking.checkIn);
            const checkOut = new Date(booking.checkOut);
            const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

            const pricePerNight = booking.room.discount
                ? Math.round(booking.room.price * (1 - booking.room.discount / 100))
                : booking.room.price;

            const totalPrice = nights * pricePerNight;

            return {
                ...booking,
                nights,
                pricePerNight,
                calculatedTotalPrice: totalPrice
            };
        });

        return { bookings: withDetails };
    },

    updateFinishBooking: async function () {
        const now = new Date();
        await prisma.booking.updateMany({
            where: {
                status: "CONFIRMED",
                checkOut: { lt: now }
            },
            data: { status: "FINISHED" }
        });
    },
    addFavoriteHotel: async function (userId, hotelId) {
        const parsedHotelId = parseInt(hotelId)
        const existingFavorite = await prisma.favoriteHotel.findUnique({
            where: {
                userId_hotelId: {
                    userId: userId,
                    hotelId: parsedHotelId,
                },
            },
        });

        if (existingFavorite) {
            throw new BadrequestException("Khách sạn này đã được người dùng yêu thích")
        }

        const favorite = await prisma.favoriteHotel.create({
            data: {
                userId: userId,
                hotelId: parsedHotelId
            }
        })

        return {
            favorite: favorite
        }
    },

    removeFavoriteHotel: async function (userId, hotelId) {
        const parsedHotelId = parseInt(hotelId)
        await prisma.favoriteHotel.delete({
            where: {
                userId_hotelId: {
                    userId: userId,
                    hotelId: parsedHotelId
                }
            }
        })
    },

    getAllFavoriteHotel: async function (userId) {

        const favorites = await prisma.favoriteHotel.findMany({
            where: {
                id: userId
            },
            include: {
                hotel: true
            }
        })
        return {
            favorites: favorites
        }
    },

    addReview: async function (userId, hotelId, data) {
        const { comment, rating } = data
        const parsedHotelId = parseInt(hotelId);

        const newReview = await prisma.review.create({
            data: {
                userId: userId,
                hotelId: parsedHotelId,
                comment: comment || "",
                rating: rating || 0
            },
            include: {
                user: {
                    select: {
                        fullName: true,
                        avatar: true
                    }
                }
            }


        })

        const avg = await prisma.review.aggregate({
            where: {
                hotelId: parsedHotelId
            },
            _avg: {
                rating: true
            }
        })

        await prisma.hotel.update({
            where: { id: parsedHotelId },
            data: {
                averageRating: avg._avg.rating || 0
            }
        })
        return {
            newReview: newReview
        }
    },

    updateReview: async function (userId, reviewId, data) {
        const parsedReviewId = parseInt(reviewId)
        const { comment, rating } = data

        const existingReview = await prisma.review.findUnique({ where: { id: parsedReviewId } })
        if (!existingReview) {
            throw new NotFoundException("Không tìm thấy đánh giá")
        }

        if (existingReview.userId !== userId) {
            throw new ConflictException("Không có quyền được sửa đánh giá này")
        }

        const updateReview = await prisma.review.update({
            where: { id: parsedReviewId },
            data: {
                comment: comment || "",
                rating: rating || 0
            }
        });

        const avg = await prisma.review.aggregate({
            where: {
                hotelId: existingReview.hotelId
            },
            _avg: {
                rating: true
            }
        })

        await prisma.hotel.update({
            where: { id: existingReview.hotelId },
            data: {
                averageRating: avg._avg.rating || 0
            }
        })
        return {
            updateReview: updateReview
        }
    },

    deleteReview: async function (userId, reviewId) {
        const parsedReviewId = parseInt(reviewId)

        const existingReview = await prisma.review.findUnique({
            where: { id: parsedReviewId }
        })

        if (!existingReview) {
            throw new NotFoundException("Không tìm thấy đánh giá này")
        }
        if (existingReview.userId !== userId) {
            throw new ConflictException("Không có quyền xóa bài viết này")
        }

        await prisma.review.delete({
            where: { id: parsedReviewId }
        })

        const avg = await prisma.review.aggregate({
            where: {
                hotelId: existingReview.hotelId
            },
            _avg: {
                rating: true
            }
        })

        await prisma.hotel.update({
            where: { id: existingReview.hotelId },
            data: {
                averageRating: avg._avg.rating || 0
            }
        })
    },



    getAllReviewHotelByUser: async function (userId) {
        const reviewsUser = await prisma.review.findMany({
            where: { userId: userId },
            select: {
                user: {
                    select: {
                        id: true,
                        avatar: true,
                        fullName: true
                    }
                },
                hotel: {
                    select: {
                        name: true,
                        image: true,
                        averageRating: true
                    }
                }
            },
            orderBy: { create_At: "desc" }
        })
        return {
            reviewsUser: reviewsUser
        }
    }

}