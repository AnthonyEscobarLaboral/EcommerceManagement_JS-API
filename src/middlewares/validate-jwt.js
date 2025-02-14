import jwt from "jsonwebtoken";
import User from "../user/user.model.js"

export const validateJWT = async (req,res,next)=>{
    try{
        let token = req.body.token || req.query.token || req.headers["authorization"]

        if(!token){
            return res.status(400).json({
                succes:false,
                message: "There is no token in your request"
            })
        }

        token = token.replace(/^Bearer\+s/,"")

        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY)
        const user = await User.findById(uid)
        if(!user){
            return res.status(400).json({
                succes: false,
                message: "User not found"
            })
        }

        if(!user.status){
            return res.status(400).json({
                succes: false,
                message: "User disabled or unavailable"
            })
        }
        next()
        return res.status(200).json({
            succes: true,
            message: "The given token is valid"
        })

    }catch(err){
        return res.status(500).json({
            succes: false,
            message: "Invalid token",
            error: err.message
        })
    }
}