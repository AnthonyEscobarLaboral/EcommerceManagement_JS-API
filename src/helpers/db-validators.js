import User from "../user/user.model.js"

export const emailExists = async (email = "") => {
    const exists = await User.findOne({email})
    if(exists){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const exists = await User.findOne({username})
    if(exists){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userFound = async (uid = " ") => {
    const exists = await User.findById(uid)
    if(!exists){
        throw new Error(`The user provided doesnt exists`)
    }
}



