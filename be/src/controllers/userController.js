import { responseSuccess } from "../helpers/response.helper.js";
import { userService } from "../services/userService.js";


export const userController = {
    updateUser: async function (req, res, next) {
        try {
            const userId = req.user.id;
            const avatarPath = req.file?.path;
            const updateUser = await userService.updateProfile(userId, req.body, avatarPath);
            const response = responseSuccess(updateUser, "Cập nhật người dùng thành công");
            res.status(response.status).json(response)
        } catch (err) {
            console.error("Cập nhật người dùng không thành công", err)
            next(err)
        }
    },

    bookingRoom: async function (req, res, next) {
        try {
            const userId = req.user.id;

            const newBooking = await userService.bookingRoom(userId, req.body);
            const response = responseSuccess(newBooking, "Booking thành công");
            res.status(response.status).json(response)
        } catch (err) {
            console.error("Booking không thành công", err)
            next(err)
        }
    },

    getHistoryBooking: async function (req, res, next) {
        try {
            const userId = req.user.id;

            const bookings = await userService.getHistoryBooking(userId);
            const response = responseSuccess(bookings, "Lấy danh sách booking của người dùng thành công");
            res.status(response.status).json(response)
        } catch (err) {
            console.error("Lấy danh sách booking người dùng không thành công", err);
            next(err);
        }
    },

    addFavoriteHotel: async function (req, res, next) {
        try {
            const userId = req.user.id;
            const hotelId = req.params.hotelId;

            const favorite = await userService.addFavoriteHotel(userId, hotelId);
            const response = responseSuccess(favorite, "Yêu thích khách sạn thành công")
            res.status(response.status).json(response)
        } catch (err) {
            console.error("Yêu thích khách sạn không thành công", err)
            next(err)
        }
    },
    removeFavoriteHotel: async function (req, res, next) {
        try {
            const userId = req.user.id;
            const hotelId = req.params.hotelId;
            await userService.removeFavoriteHotel(userId, hotelId)
            const response = responseSuccess(null, "Xóa khách sạn thành công")
            res.status(response.status).json(response)
        } catch (err) {
            console.error("Xóa khách sạn không thành công", err)
            next(err)
        }
    },
    getAllFavoriteHotel: async function (req, res, next) {
        try {
            const userId = req.user.id;
            const favorites = await userService.getAllFavoriteHotel(userId);
            const response = responseSuccess(favorites, 'Lấy danh sách yêu thích khách sạn thành công')
            res.status(response.status).json(response)
        } catch (err) {
            console.error("Lấy danh sách yêu thích khách sạn không thành công", err)
            next(err)
        }
    },

    addReview: async function (req, res, next) {
        try {
            const userId = req.user.id;
            const hotelId = req.params.hotelId;
            const newReview = await userService.addReview(userId, hotelId, req.body)
            const response = responseSuccess(newReview, "Thêm review vào khách sạn thành công")
            res.status(response.status).json(response)
        } catch (err) {
            console.error("Thêm review không thành công", err)
            next(err)
        }
    },
    updateReview: async function (req, res, next) {
        try {
            const userId = req.user.id;
            const reviewId = req.params.id;

            const updateReview = await userService.updateReview(userId, reviewId, req.body)
            const response = responseSuccess(updateReview, "Cập nhật đánh giá thành công")
            res.status(response.status).json(response)
        } catch (error) {
            console.error("Cập nhật đánh giá không thành công", err)
            next(err)
        }
    },

    deleteReview: async function (req, res, next) {
        try {
            const userId = req.user.id;
            const reviewId = req.params.id;
            await userService.deleteReview(userId, reviewId)
            const response = responseSuccess(null, "Xóa đánh giá thành công")
            res.status(response.status).json(response)
        } catch (err) {
            console.error("Xóa đánh giá không thành công", err)
            next(err)
        }
    },
    getAllReviewByHotelId: async function (req, res, next) {
        try {
            const hotelId = req.params.id;
            const reviews = await userService.getAllReviewByHotelId(hotelId)
            const response = responseSuccess(reviews, "Lấy danh sách đánh giá của khách sạn thành công")
            res.status(response.status).json(response)
        } catch (err) {
             console.error("Lấy danh sách đánh giá của khách sạn đó không thành công", err)
            next(err)
        }
    },

    getAllReviewHotelByUser : async function (req,res,next) {
        try {
            const userId = req.user.id
            const reviewsUser = await userService.getAllReviewHotelByUser(userId)
           const response = responseSuccess(reviewsUser, "Lấy danh sách đánh giá của khách sạn của người dùng đó thành công")
            res.status(response.status).json(response)
        } catch (err) {
             console.error("Lấy danh sách đánh giá của khách sạn của người dùng đó không thành công", err)
            next(err)
        }

    }

}