import Notification from "../models/notification.model.js";

export const getAllNotifications = async(req, res) => {
    try {
        const userId = req.user._id
        const notifications = await Notification.find({to:userId})
        .populate({
            path:'from',
            select:'username profileImg'
        })
        await Notification.updateMany({to:userId}, {read:true})
        return res.status(200).json(notifications)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const clearAllNotifications = async(req, res) => {
    try {
        const userId = req.user._id
        await Notification.deleteMany({to: userId})
        return res.status(200).json({message:'notifications deleted successfully'})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deleteNotification = async(req, res) => {
    try {
        const {id}  = req.params
        const notification = await Notification.findByIdAndDelete(id)
        if(!notification){
            return res.status(404).json({message:'No notification found'})
        }
        return res.status(200).json({message:'notification deleted successfully'})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
