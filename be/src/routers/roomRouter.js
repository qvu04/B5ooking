import express from 'express'
import { roomController } from '../controllers/roomController.js';

const router = express.Router()

// Lấy danh sách phòng của khách sạn
router.get('/getRoomsByHotel/:hotelId',roomController.getRoomsByHotelId);
// Lấy thông tin phòng theo id
router.get('/getRoomById/:roomId',roomController.getRoomById);

export default router