import express from 'express'
import { verifyToken } from '../middlewares/verify.middleware.js';
import { getUserProfile } from '../controllers/user.controller.js';

const userRouter = express.Router()

userRouter.get('/get-user-profile/:username', verifyToken, getUserProfile)

export default userRouter