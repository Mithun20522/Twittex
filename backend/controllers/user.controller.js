import User from '../models/user.model.js';

export const getUserProfile = async(req, res) => {
    try {
        const {username} = req.params
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({message:'No user found'})
        }
        const {password:pass, ...rest} = user._doc
        return res.status(200).json(rest)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
