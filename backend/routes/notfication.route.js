import express from 'express'
import { verifyToken } from '../middlewares/verify.middleware.js'
import { clearAllNotifications, getAllNotifications } from '../controllers/notification.controller.js'

const notifcationRouter = express.Router()

notifcationRouter.get('/get-notifications', verifyToken, getAllNotifications)
notifcationRouter.get('/clear-notifications', verifyToken, clearAllNotifications)

export default notifcationRouter