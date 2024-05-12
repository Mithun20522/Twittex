import bcrypt from 'bcryptjs'
import User from '../models/user.model.js';
import { generateTokenAndSetCookies } from '../utils/generateTokenAndSetCookies.js';

export const signup = async(req, res) => {
    try {
        const {email, username, fullName, password} = req.body
        if(!email || !username || !fullName || !password){
            return res.status(400).json({message:'Some fields are mandatory'})
        }
        const emailregx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if(!emailregx.test(email)){
            return res.status(400).json({message:'Invalid email format'})
        }
        const existingUser = await User.findOne({email,username})
        if(existingUser){
            return res.status(409).json({message:'User already exist'})
        }
        const hashedPassword = bcrypt.hashSync(password, 10)

        const newUser = new User({
            username,
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookies(newUser._id, res)
            await newUser.save()
            const {password:pass,...rest} = newUser._doc
            return res.status(201).json({message:'user registered', rest})
        }
        else{
            return res.status(400).json({message:'Invalid user data'})
        }

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
export const signin = async(req, res) => {
    try {
        const {username, password} = req.body
        if(!username || !password){
            return res.status(400).json({message:'All fields are mandatory'})
        }
        
        const existingUser = await User.findOne({username})
        if(!existingUser){
            return res.status(404).json({message:'No user found'})
        }
        const validUser = bcrypt.compareSync(password, existingUser.password)

        if(!validUser){
            return res.status(400).json({message:'Wrong credentials'})
        }
        generateTokenAndSetCookies(existingUser._id, res)
        const {password:pass,...rest} = existingUser._doc
        return res.status(201).json({message:'Login successfull', rest})
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const signout = async(req, res) => {
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(400).json({message:'Please login first'})
        }
        res.clearCookie("jwt",token)
        return res.status(200).json({message:'logout successfull'})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}