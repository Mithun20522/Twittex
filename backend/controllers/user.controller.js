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
            res.status(200).json({message:'User followed successfully'})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}