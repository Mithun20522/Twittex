import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import {v2 as cloudinary} from 'cloudinary'
export const createPost = async(req, res) => {
    try {
        const {text} = req.body
        let {img} = req.body
        const userId = req.user._id.toString()
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:'user not found'})
        }
        if(!text && !img){
            return res.status(404).json({message:'post must have text or image'})
        }

        if(img){
            const uploadedResponse = await cloudinary.uploader.upload(img)
            img = uploadedResponse.secure_url
        }
        const newPost = new Post({
            user:userId,
            text,
            img
        })
        await newPost.save()
        return res.status(201).json(newPost)

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}