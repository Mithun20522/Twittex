import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectMongoDB from './db/connectMongo.js'
import authRouter from './routes/auth.route.js'

dotenv.config()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

connectMongoDB(MONGO_URL)

// apis routes
app.use('/api/auth',authRouter)


app.listen(PORT,() => console.log(`server is running on PORT:${PORT}`))
