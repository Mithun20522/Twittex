import express from 'express'
import { verifyToken } from '../middlewares/verify.middleware.js';
import { commentOnPost, createPost, deletePost, getAllPosts, likeDislikePost } from '../controllers/post.controller.js';

const postRouter = express.Router()

postRouter.get('/get-posts', verifyToken, getAllPosts)
postRouter.post('/create-post',verifyToken, createPost)
postRouter.delete('/delete-post/:id', verifyToken, deletePost)
postRouter.post('/comment-on-post/:id', verifyToken, commentOnPost)
postRouter.post('/like-dislike-post/:id', verifyToken, likeDislikePost)

export default postRouter