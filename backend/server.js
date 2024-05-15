import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectMongoDB from './db/connectMongo.js'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import notifcationRouter from './routes/notfication.route.js'
import {v2 as cloudinary} from 'cloudinary'
import postRouter from './routes/post.route.js'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

connectMongoDB(MONGO_URL)


app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/notification', notifcationRouter)
app.use('/api/post',postRouter)

app.listen(PORT,() => console.log(`server is running on PORT:${PORT}`))
