import User from "./user.model.js";

export const changeClientProfile = async (req, res) => {
    try {
        const { uid } = req.params;
        const newData = req.body;

        const client = await User.findByIdAndUpdate(uid, newData, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Profile changes updated succesfully',
            client,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'failed to update profile changes',
            error: err.message
        });
    }
};

export const changeClientPassword = async (req, res) => {
    try{
        const { uid } = req.params
        const { newPassword } = req.body

        const user = await User.findById(uid)

        const checkOldNew = await verify(user.password, newPassword)

        if(checkOldNew){
            return res.status(400).json({
                success: false,
                message: "The new password cannot be the same as the old one"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(uid, {password: encryptedPassword}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Password changed succesfully",
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to update password",
            error: err.message
        })
    }
};

export const disableClientAccount = async (req, res) => {
    try {
        const { uid } = req.params
        const user = await User.findByIdAndUpdate(uid, { status: false }, { new: true })

        return res.status(200).json({
            success: true,
            message: "Your client account has been deleted succesfully",
            user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "failed to delete your account",
            error: err.message
        })
    }
};