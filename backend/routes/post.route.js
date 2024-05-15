import express from 'express'
import { verifyToken } from '../middlewares/verify.middleware.js';
import { createPost, deletePost } from '../controllers/post.controller.js';

const postRouter = express.Router()

postRouter.post('/create-post',verifyToken, createPost)
postRouter.delete('/delete-post/:id', verifyToken, deletePost)

export default postRouter