import express from 'express';
import { upload } from '../Config/cloudinary.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { checkAdmin } from '../middleware/checkAdmin.js';
import { adminController } from '../controllers/adminController.js';

const router = express.Router();

// Tạo thêm,sửa, xóa vị trí
router.post('/createLocation',upload.single('imageFile'),authMiddleware,checkAdmin,adminController.createLocation);
router.put('/updateLocation/:id',upload.single('imageFile'),authMiddleware,checkAdmin,adminController.updateLocation);
router.delete('/deleteLocation/:id',authMiddleware,checkAdmin,adminController.deleteLocation);

// Lấy danh sách vị trí
router.get('/getAllLocations',authMiddleware,checkAdmin,adminController.getAllLocations);

// Tạo tiện nghi
router.post('/createAmenity',authMiddleware,checkAdmin,adminController.createAmenity);

// Lấy danh sách tiện nghi
router.get('/getAllAmenities',authMiddleware,checkAdmin,adminController.getAllAmenities);

// Tạo sửa xóa khách sạn
router.post('/createHotel',upload.array('imageFile',30),authMiddleware,checkAdmin,adminController.createHotel);
router.put('/updateHotel/:id',upload.single('imageFile'),authMiddleware,checkAdmin,adminController.updateHotel);
router.delete('/deleteHotel/:id',authMiddleware,checkAdmin,adminController.deleteHotel);

// Lấy danh sách khách sạn
router.get('/getAllHotels',authMiddleware,checkAdmin,adminController.getAllHotels);

// Lấy thông tin khách sạn theo id
router.get('/getHotelById/:id',authMiddleware,checkAdmin,adminController.getHotelById);

// lấy danh sách ảnh phụ của khách sạn
router.get('/getHotelImages/:hotelId',authMiddleware,checkAdmin,adminController.getHotelImages);

// Thêm sửa xóa ảnh phụ của khách sạn
router.post('/addHotelImage/:hotelId',upload.array('imageFile',30),authMiddleware,checkAdmin,adminController.addHotelImage);
router.put('/updateHotelImage/:id',upload.single('imageFile'),authMiddleware,checkAdmin,adminController.updateHotelImage);
router.delete('/deleteHotelImage/:id',authMiddleware,checkAdmin,adminController.deleteHotelImage);

// Lấy khách sạn theo khu vực
router.get('/getHotelsByLocation/:locationId',authMiddleware,checkAdmin,adminController.getHotelsByLocation);

// Tạo sửa xóa phòng
router.post('/createRoom',upload.array('imageFile',5),authMiddleware,checkAdmin,adminController.createRoom);
router.put('/updateRoom/:id',upload.single('imageFile'),authMiddleware,checkAdmin,adminController.updateRoom);
router.delete('/deleteRoom/:id',authMiddleware,checkAdmin,adminController.deleteRoom);

// Tạo sửa xóa ảnh phụ của phòng 
router.post('/addRoomImage/:id',upload.array('imageFile',5),authMiddleware,checkAdmin,adminController.addRoomImage);
router.put('/updateRoomImage/:id',upload.single('imageFile'),authMiddleware,checkAdmin,adminController.updateRoomImage);
router.delete('/deleteRoomImage/:id',authMiddleware,checkAdmin,adminController.deleteRoomImage);

// Tạo sửa xóa blog
router.post('/createBlog',upload.single('imageFile'),authMiddleware,checkAdmin,adminController.createBlog);
router.put('/updateBlog/:id',upload.single('imageFile'),authMiddleware,checkAdmin,adminController.updateBlog);
router.delete('/deleteBlog/:id',authMiddleware,checkAdmin,adminController.deleteBlog);

// Lấy danh sách người dùng
router.get('/getAllUsers',authMiddleware,checkAdmin,adminController.getAllUsers);
// Lấy danh sách phòng của khách sạn
router.get('/getRoomsByHotel/:hotelId',authMiddleware,checkAdmin,adminController.getRoomsByHotel);

// Lấy những khách sạn liên quan tới địa điểm và nhận phòng trả phòng và số người
router.get('/getSearchAvailableHotels',authMiddleware,checkAdmin,adminController.getSearchAvailableHotels);
export default router