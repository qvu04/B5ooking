import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import { checkAdmin } from '../middleware/checkAdmin'
import { dashBoardController } from '../controllers/dashBoardController'

const router = express.Router()

router.get('/getTotal',authMiddleware,checkAdmin,dashBoardController.getTotal);
router.get('/getGroupedRevenue',authMiddleware,checkAdmin,dashBoardController.getGroupedRevenue);
router.get('/getHotelRevenuePercentage',authMiddleware,checkAdmin,dashBoardController.getHotelRevenuePercentage);

export default router