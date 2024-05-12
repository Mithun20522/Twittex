import Notification from "../models/notification.model.js";

export const getAllNotifications = async(req, res) => {
    try {
        const notifications = await Notification.find()
        if(notifications.length === 0){
            return res.status(404).json({message:'No notfication yet'})
        }
        return res.status(200).json(notifications)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const clearAllNotifications = async(req, res) => {
    try {
        const notifications = await Notification.find()
        if(notifications.length === 0){
            return res.status(404).json({message:'No notfication yet'})
        }
        notifications.map(async(notif) => {
            await Notification.findByIdAndDelete(notif._id)
        })
        return res.status(200).json({message:'notifications cleared'})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}