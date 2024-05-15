import express from 'express'
import { verifyToken } from '../middlewares/verify.middleware.js';
import { commentOnPost, createPost, deletePost } from '../controllers/post.controller.js';

const postRouter = express.Router()

postRouter.post('/create-post',verifyToken, createPost)
postRouter.delete('/delete-post/:id', verifyToken, deletePost)
postRouter.post('/comment-on-post/:id', verifyToken, commentOnPost)

export default postRouter