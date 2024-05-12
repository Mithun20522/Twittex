import express from 'express'
import { getMe, signin, signout, signup } from '../controllers/auth.controller.js'
import { verifyToken } from '../middlewares/verify.middleware.js'

const authRouter = express.Router()

authRouter.get('/getme',verifyToken, getMe)
authRouter.post('/signup',signup)
authRouter.post('/signin',signin)
authRouter.get('/signout',signout)

export default authRouter

