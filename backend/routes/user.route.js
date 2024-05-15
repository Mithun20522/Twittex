import express from 'express'
import { verifyToken } from '../middlewares/verify.middleware.js';
import { followUnfollowUser, getSuggestedUsers, getUserProfile, updateUser } from '../controllers/user.controller.js';

const userRouter = express.Router()

userRouter.get('/get-user-profile/:username', verifyToken, getUserProfile)
userRouter.get('/follow-unfollow-user/:id', verifyToken, followUnfollowUser)
userRouter.get('/get-suggested-users', verifyToken, getSuggestedUsers)
userRouter.post('/update-user', verifyToken, updateUser)

export default userRouter