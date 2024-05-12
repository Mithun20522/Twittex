import User from "../models/user.model.js"
import JWT from 'jsonwebtoken'
export const verifyToken = async(req, res, next) => {
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message:'Access denied'})
        }
        const decode = JWT.verify(token, process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({message:'Access denied'})
        }
        const user = await User.findById(decode.userId).select('-password')
        if(!user){
            return res.status(404).json({message:'user not found'})
        }
        req.user = user
        next()
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}