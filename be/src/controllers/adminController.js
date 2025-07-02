import { BadrequestException } from "../helpers/exception.helper.js";
import { responseSuccess } from "../helpers/response.helper.js";
import { adminService } from "../services/adminService.js";


export const adminController = {
    // Tạo vị trí
    createLocation: async function (req, res, next) {
        try {
            const imageFile = req.file?.path;
            const { newLocation } = await adminService.createLocation(req.body, imageFile);
            const response = responseSuccess(newLocation, "Tạo vị trí thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Tạo vị trí không thành công", err);
            next(err);
        }
    },

    // update vị trí
    updateLocation: async function (req, res, next) {
        try {
            const locationId = parseInt(req.params.id);
            const imageFile = req.file?.path;
            const { updatedLocation } = await adminService.updateLocaltion(locationId, req.body, imageFile);
            const response = responseSuccess(updatedLocation, "Cập nhật vị trí thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Cập nhật vị trí không thành công", err);
            next(err);
        }
    },
    // Xoá vị trí
    deleteLocation: async function (req, res, next) {
        try {
            const locationId = parseInt(req.params.id);
            await adminService.deleteLocation(locationId);
            const response = responseSuccess(null, "Xoá vị trí thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Xoá vị trí không thành công", err);
            next(err);
        }
    },
    // Lấy danh sách vị trí
    getAllLocations: async function (req, res, next) {
        try {
            const locations = await adminService.getAllLocaltions();
            const response = responseSuccess(locations, "Lấy danh sách vị trí thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Lấy danh sách vị trí không thành công", err);
            next(err);
        }
    },
    // Tạo tiện nghi
    createAmenity: async function (req, res, next) {
        try {
            const newAmenity = await adminService.createAmenity(req.body);
            const response = responseSuccess(newAmenity, "Tạo tiện nghi thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Tạo tiện nghi không thành công", err);
            next(err);
        }

    },
    // Lấy danh sách tiện nghi
    getAllAmenities: async function (req, res, next) {
        try {
            const amenities = await adminService.getAllAmenities();
            const response = responseSuccess(amenities, "Lấy danh sách tiện nghi thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Lấy danh sách tiện nghi không thành công", err);
            next(err);
        }
    },
    // Tạo khách sạn
    createHotel: async function (req, res, next) {
        try {
            const imageFile = req.files?.map(file => file.path) || [];
            const { newHotel } = await adminService.createHotel(req.body, imageFile)
            const response = responseSuccess(newHotel, "Tạo khách sạn thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Tạo khách sạn không thành công", err)
            next(err)
        }
    },

    // Lấy danh sách khách sạn
    getAllHotels: async function (req, res, next) {
        try {
            const hotels = await adminService.getAllHotels();
            const response = responseSuccess(hotels, "Lấy danh sách khách sạn thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Lấy danh sách khách sạn không thành công", err);
            next(err);
        }
    },
    // Cập nhật khách sạn 
    updateHotel: async function (req, res, next) {
        try {
            const hotelId = parseInt(req.params.id);
            const imageFile = req.file?.path;
            const { updatedHotel } = await adminService.updateHotel(hotelId, req.body, imageFile);
            const response = responseSuccess(updatedHotel, "Cập nhật khách sạn thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Cập nhật khách sạn không thành công", err);
            next(err);
        }
    },

    deleteHotel: async function (req, res, next) {
        try {
            const hotelId = parseInt(req.params.id);
            await adminService.deleteHotel(hotelId);
            const response = responseSuccess(null, "Xoá khách sạn thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Xoá khách sạn không thành công", err);
            next(err);
        }
    },
    // Lấy danh sách ảnh phụ của khách sạn theo hotelId
    getHotelImages: async function (req, res, next) {
        const hotelId = parseInt(req.params.hotelId);
        try {
            const hotelImages = await adminService.getHotelImages(hotelId);
            const response = responseSuccess(hotelImages, "Lấy danh sách ảnh khách sạn thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Lấy danh sách ảnh khách sạn không thành công", err);
            next(err);
        }
    },
    // Thêm sửa xóa ảnh phụ của khách sạn
    addHotelImage: async function (req, res, next) {
        const hotelId = parseInt(req.params.hotelId);
        const imageFile = req.files?.map(file => file.path) || [];
        if (!imageFile || imageFile.length === 0) {
            throw { status: 400, message: "Ảnh không tải lên" };
        }
        try {
            const newImages = await adminService.addHotelImage(hotelId, imageFile);
            const response = responseSuccess(newImages, "Thêm ảnh khách sạn thành công");
            return res.status(response.status).json(response);
        } catch (err) {
            console.error("Thêm ảnh khách sạn không thành công", err);
            next(err);

        }
    },

    updateHotelImage: async function (req, res, next) {
        const imageId = parseInt(req.params.id);
        const imageFile = req.file?.path;
        if (!imageFile) {
            return res.status(400).json({ message: "Ảnh không tải lên" });
        }
        try {
            const updatedImage = await adminService.updateHotelImage(imageId, imageFile);
            const response = responseSuccess(updatedImage, "Cập nhật ảnh khách sạn thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Cập nhật ảnh khách sạn không thành công", err);
            next(err);
        }
    },
    deleteHotelImage: async function (req, res, next) {
        const imageId = parseInt(req.params.id);
        try {
            await adminService.deleteHotelImage(imageId);
            const response = responseSuccess(null, "Xoá ảnh khách sạn thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Xoá ảnh khách sạn không thành công", err);
            next(err);
        }
    },

    // lấy thông tin khách sạn theo id
    getHotelById: async function (req, res, next) {
        const hotelId = parseInt(req.params.id);
        try {
            const {hotel} = await adminService.getHotelById(hotelId);
            const response = responseSuccess(hotel, "Lấy thông tin khách sạn thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Lấy thông tin khách sạn không thành công", err);
            next(err);
        }
    },

    // Lấy khách sạn theo khu vực
    getHotelsByLocation: async function (req, res, next) {
        const locationId = parseInt(req.params.locationId);
        try {
            const hotels = await adminService.getHotelsByLocation(locationId);
            const response = responseSuccess(hotels, "Lấy danh sách khách sạn theo khu vực thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Lấy danh sách khách sạn theo khu vực không thành công", err);
            next(err);
        }
    },

    // Tạo phòng của khách sạn đó
    createRoom: async function (req, res, next) {
        try {
            const imageFile = req.files?.map(file => file.path) || [];
            const newRoom = await adminService.createRoom(req.body, imageFile);
            const response = responseSuccess(newRoom, "Tạo phòng thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Tạo phòng không thành công", err);
            next(err);
        }
    },
    // update phòng của khách sạn
    updateRoom: async function (req, res, next) {
        const roomId = parseInt(req.params.id);
        const imageFile = req.file?.path;
        try {
            const updatedRoom = await adminService.updateRoom(roomId, req.body, imageFile);
            const response = responseSuccess(updatedRoom, "Cập nhật phòng thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Cập nhật phòng không thành công", err);
            next(err);
        }
    },

    // Xoá phòng của khách sạn
    deleteRoom: async function (req, res, next) {
        const roomId = parseInt(req.params.id);
        try {
            await adminService.deleteRoom(roomId);
            const response = responseSuccess(null, "Xoá phòng thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Xoá phòng không thành công", err);
            next(err);
        }
    },
    // Tạo ảnh phụ cho phòng
    addRoomImage: async function (req, res, next) {
        const roomId = parseInt(req.params.id);
        const imageFile = req.files?.map(file => file.path) || [];
        if (!imageFile || imageFile.length === 0) {
            throw new BadrequestException("Ảnh không tải lên");
        }
        try {
            const newImages = await adminService.addRoomImage(roomId, imageFile);
            const response = responseSuccess(newImages, "Thêm ảnh phòng thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Thêm ảnh phòng không thành công", err);
            next(err);
        }
    },
    // Cập nhật ảnh phụ của phòng
    updateRoomImage: async function (req, res, next) {
        const imageId = parseInt(req.params.id);
        const imageFile = req.file?.path;
        if (!imageFile) {
            throw new BadrequestException("Ảnh không tải lên");
        }
        try {
            const updatedImage = await adminService.updateRoomImage(imageId, imageFile);
            const response = responseSuccess(updatedImage, "Cập nhật ảnh phòng thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Cập nhật ảnh phòng không thành công", err);
            next(err);
        }
    },
    // Xóa ảnh phụ của phòng
    deleteRoomImage: async function (req, res, next) {
        const imageId = parseInt(req.params.id);
        try {
            await adminService.deleteRoomImage(imageId);
            const response = responseSuccess(null, "Xóa ảnh phòng thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Xóa ảnh phòng không thành công", err);
            next(err);
        }
    },
    // Tạo blog
    createBlog: async function (req, res, next) {
        try {
            const imageFile = req.file?.path;
            const newBlog = await adminService.createBlog(req.body, imageFile);
            const response = responseSuccess(newBlog, "Tạo blog thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Tạo blog không thành công", err);
            next(err);
        }
    },
    // Cập nhật blog 
    updateBlog: async function (req, res, next) {
        const blogId = parseInt(req.params.id);
        const imageFile = req.file?.path;
        try {
            const updatedBlog = await adminService.updateBlog(blogId, req.body, imageFile);
            const response = responseSuccess(updatedBlog, "Cập nhật blog thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Cập nhật blog không thành công", err);
            next(err);
        }
    },
    // Xóa blog
    deleteBlog: async function (req, res, next) {
        const blogId = parseInt(req.params.id);
        try {
            await adminService.deleteBlog(blogId);
            const response = responseSuccess(null, "Xoá blog thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Xoá blog không thành công", err);
            next(err);
        }
    },
    // Tạo sửa xóa người dùng ở admin
    createUser: async function (req, res, next) {
        try {
            const avatarPath = req.file?.path;
            const newUser = await adminService.createUser(req.body, avatarPath);
            const response = responseSuccess(newUser, "Tạo người dùng thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Tạo người dùng không thành công", err);
            next(err);
        }
    },
    updateUser: async function (req, res, next) {
        const userId = parseInt(req.params.id);
        const avatarPath = req.file?.path;
        try {
            const updatedUser = await adminService.updateUser(userId, req.body, avatarPath);
            const response = responseSuccess(updatedUser, "Cập nhật người dùng thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Cập nhật người dùng không thành công", err);
            next(err);
        }
    },
    deleteUser: async function (req, res, next) {

        try {
            const userId = parseInt(req.params.id);
            await adminService.deleteUser(userId);
            const response = responseSuccess(null, "Xoá người dùng thành công");
            res.status(response.status).json(response);
        } catch (err) {
            console.error("Xoá người dùng không thành công", err);
            next(err);
        }
    },
    // Lấy danh sách người dùng
    getAllUsers: async function (req, res, next) {

        try {
            const currentUser = req.user.id; // Lấy id của người dùng hiện tại
            const users = await adminService.getAllUsers(currentUser);
            const response = responseSuccess(users, "Lấy danh sách người dùng thành công");
            res.status(response.status).json(response);
        } catch (error) {
            console.error("Lấy danh sách người dùng không thành công", error);
            next(error);
        }
    },
    // Lấy danh sách phòng của khách sạn
    getRoomsByHotel: async function (req, res, next) {
        const hotelId = parseInt(req.params.hotelId);
        try {
                const rooms = await adminService.getRoomsByHotelId(hotelId);
                const response = responseSuccess(rooms, "Lấy danh sách phòng thành công");
                res.status(response.status).json(response);
            } catch (err) {
                console.error("Lấy danh sách phòng không thành công", err);
                next(err);
            }
        },

        // Lấy những khách sạn liên quan tới địa điểm và nhận phòng trả phòng và số người
        getSearchAvailableHotels: async function (req, res, next) {
            try {
                const result = await adminService.getSearchAvailableHotels(req.query);
                const response = responseSuccess(result, "Lấy danh sách khách sạn thành công");
                res.status(response.status).json(response);
            } catch (error) {
                console.error("Lấy danh sách khách sạn không thành công", error);
                next(error);
            }
        }

    }