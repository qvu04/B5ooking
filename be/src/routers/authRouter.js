import express from 'express'


import { authController } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { checkAdmin } from '../middleware/checkAdmin.js';

const router = express.Router();

router.post("/register",authController.register);
router.post("/login",authController.login)
router.get('/getUserById',authMiddleware,authController.getUserById);


export default router;