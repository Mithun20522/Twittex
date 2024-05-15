import Notification from '../models/notification.model.js';
import User from '../models/user.model.js';
import  bcrypt  from 'bcryptjs';
import {v2 as cloudinary} from 'cloudinary'

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
        const {fullName, email, username, currentPassword, newPassword, bio , links} = req.body
        let {profileImg, coverImg} = req.body
        const userId = req.user._id
        let user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:'user not found'})
        }

        if((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({message:'please provide both current password and new password'})
        }

        if(currentPassword && newPassword){
            const isMatch = bcrypt.compareSync(currentPassword, user.password)
            if(!isMatch){
                return res.status(400).json({message:'current password is incorrect'})
            }
            if(newPassword.length < 6){
                return res.status(400).json({message:'password must of 6 character long'})
            }
            user.password = bcrypt.hashSync(newPassword, 10)
        }

        if(profileImg){
            if(user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split('/').pop().split('.')[0])
            }
            const uploadedResponse = await cloudinary.uploader.upload(profileImg)
            profileImg = uploadedResponse.secure_url
        }
        if(coverImg){
            if(user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split('/').pop().split('.')[0])
            }
            const uploadedResponse = await cloudinary.uploader.upload(coverImg)
            profileImg = uploadedResponse.secure_url
        }

        user.fullName = fullName || user.fullName
        user.email = email || user.email
        user.username = username || user.username
        user.bio = bio || user.bio
        user.links = links || user.links
        user.profileImg = profileImg || user.profileImg
        user.coverImg = coverImg || user.coverImg

        user = await user.save()

        const {password:pass, ...rest} = user._doc

        return res.status(200).json({message:'profile updated', rest})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}