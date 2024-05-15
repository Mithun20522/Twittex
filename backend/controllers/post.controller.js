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

export const deletePost = async(req, res) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        if(!post){
            return res.status(404).json({message:'post not found'})
        }
        
        if(post.user.toString() !== req.user._id.toString()){
            return res.status(401).json({message:'You are not authorized to delete this post'})
        }
        if(post.img){
            const imgId = post.img.split('/').pop().split('.')[0]
            await cloudinary.uploader.destroy(imgId)
        }
        await Post.findByIdAndDelete(id)
        return res.status(200).json({message:'post deleted successfully'})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}