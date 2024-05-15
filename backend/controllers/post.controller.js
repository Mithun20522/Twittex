import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import {v2 as cloudinary} from 'cloudinary'
import Notification from '../models/notification.model.js';
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

export const commentOnPost = async(req, res) => {
    try {
        const {text} = req.body
        const postId = req.params.id
        const userId = req.user._id
        if(!text){
            return res.status(400).json({message:'text field is required'})
        }
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({message:'post not found'})
        }

        const comment = {user:userId, text}
        post.comments.push(comment)

        await post.save()
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const likeDislikePost = async(req, res) => {
    try {
        const userId = req.user._id
        const postId = req.params.id
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({message:'post not found'}) 
        }
        const likedPostByUser = post.likes.includes(userId)
        if(likedPostByUser){
            // dislike post
            await Post.updateOne({_id:postId},{$pull: {likes: userId}})
            return res.status(200).json({message:'post disliked succeefully'})
        }
        else{
            //like post
            post.likes.push(userId)
            await post.save()

            const notification = new Notification({
                from: userId,
                to: post.user,
                type:'like'
            })
            await notification.save()
            return res.status(200).json({message:'post liked successfully'})
        }
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}