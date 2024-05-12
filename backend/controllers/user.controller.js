import Notification from '../models/notification.model.js';
import User from '../models/user.model.js';

export const getUserProfile = async(req, res) => {
    try {
        const {username} = req.params
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({message:'No user found'})
        }
        const {password:pass, ...rest} = user._doc
        return res.status(200).json(rest)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const followUnfollowUser = async(req, res) => {
    try {
        const {id} = req.params
        const userToModify = await User.findById(id)
        const currentUser = await User.findById(req.user._id)
        if(id === req.user._id.toString()){
            return res.status(400).json({message:"You can't follow/unfollow yourself"})
        }

        if(!userToModify || !currentUser){
            return res.status(404).json({message:'No user found'})
        }

        const isAlreadyFollowing = currentUser.following.includes(id)

        if(isAlreadyFollowing){
            //unfollow
            await User.findByIdAndUpdate(id,{$pull: {followers: req.user._id}})
            await User.findByIdAndUpdate(req.user._id,{$pull: {following: id}})
            res.status(200).json({message:'User unfollowed successfully'})
        }
        else{
            //follow
            await User.findByIdAndUpdate(id,{$push: {followers: req.user._id}})
            await User.findByIdAndUpdate(req.user._id,{$push: {following: id}})
            const notification = new Notification({
                from:req.user._id,
                to:userToModify._id,
                type:'follow'
            })
            await notification.save();
            res.status(200).json({message:'User followed successfully'})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getSuggestedUsers = async(req, res) => {
    try {
        const userId = req.user._id
        const usersFollowedByMe = await User.findById(userId).select('following');
        const users = await User.aggregate([
            {
                $match:{
                    _id: {$ne: userId}
                }
            },
            {
                $sample:{
                    size:10
                }
            }
        ])

        const filteredUsers = users.filter(user => !usersFollowedByMe.following.includes(user._id))
        const suggestedUsers = filteredUsers.slice(0,4)

        suggestedUsers.forEach(user => user.password=null)
        return res.status(200).json(suggestedUsers)

    } catch (error) {
        return res.status(500).json({message:error.message}) 
    }
}

export const updateUser = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, {new:true})
        if(!user){
            return res.status(404).json({message:'user not found'})
        }
        return res.status(200).json({message:'user profile updated'})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}