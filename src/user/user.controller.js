import User from "./user.model.js";
import { hash, verify } from "argon2";

export const changeClientProfile = async (req, res) => {
    try {
        const { uid } = req.params;
        const newData = req.body;
        const userJwt = req.userJwt._id;

        if (uid !== userJwt.toString()) {
            return res.status(400).json({
                success: false,
                message: "Only the account creator can delete this account"
            });
        }

        const client = await User.findByIdAndUpdate(uid, newData, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Profile changes updated succesfully',
            client: {
                completeName: client.completeName,
                username: client.username,
                role: client.role,
                createdAt: client.createdAt, 
                updatedAt: client.updatedAt
            }
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
    try {
        const { uid } = req.params;
        const { newPassword } = req.body;

        const user = await User.findById(uid);

        const checkOldNew = await verify(user.password, newPassword);
        
        if (checkOldNew) {
            return res.status(400).json({
                success: false,
                message: "The new password cannot be the same as the old one"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Password changed succesfully",
            account: {
                completeName: user.completeName,
                username: user.username,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to update password",
            error: err.message
        });
    }
};

export const disableClientAccount = async (req, res) => {
    try {
        const { uid } = req.params;
        const { password } = req.body;
        const userJwt = req.userJwt._id;

        if (uid !== userJwt.toString()) {
            return res.status(400).json({
                success: false,
                message: "Only the account creator can delete this account"
            });
        }

        const user = await User.findById(uid);
        const checkConfirmation = await verify(user.password, password);

        if (!checkConfirmation) {
            return res.status(400).json({
                success: false,
                message: "The password provided wasn't correct, try again"
            });
        }

        await User.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Your client account has been deleted succesfully: account: ",
            user: {
                completeName: user.completeName,
                username: user.username,
                role: user.role,
                status: user.status,
                createdAt: user.createdAt, 
                updatedAt: user.updatedAt
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "failed to delete your account",
            error: err.message
        });
    }
};


/* ADMINISTRATORS FUNCTIONS */

export const createAccountByAdmin = async (req, res) => {
    try {
        const admin = req.userJwt;
        const userReceived = req.body;

        const encryptedPassword = await hash(userReceived.password);

        userReceived.password = encryptedPassword;

        const user = await User.create(userReceived);

        return res.status(201).json({
            message: "User registered succesfully",
            admin:{
                completeName: admin.completeName,
                role: admin.role,
            },
            account_created: {
                completeName: user.completeName,
                username: user.username,
                role: user.role,
                createdAt: user.createdAt
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed,check the information",
            error: err.message
        });
    }
};

export const changeRoleByAdmin = async (req, res) => {
    try {
        const { uid } = req.params;
        const { newRole } = req.body;
        const admin = req.userJwt;

        if (newRole !== "ADMIN" && newRole !== "CLIENT") {
            return res.status(400).json({
                success: false,
                message: "New role unvalid."
            });
        };

        const account = await User.findById(uid);

        if (!account) {
            return res.status(400).json({
                success: false,
                message: "account to update not found"
            });
        };

        const updatedAccount = await User.findByIdAndUpdate(uid, {role: newRole}, { new: true });
        
        res.status(200).json({
            success: true,
            msg: 'Profile role updated succesfully',
            admin:{
                completeName: admin.completeName,
                role: admin.role,
            },
            account: {
                completeName: updatedAccount.completeName,
                username: updatedAccount.username,
                role: updatedAccount.role,
                createdAt: updatedAccount.createdAt,
                updatedAt: updatedAccount.updatedAt
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'failed to update profile role',
            error: err.message
        });
    }
};

export const changeClientByAdmin = async (req, res) => {
    try {
        const { uid } = req.params;
        const newData = req.body;
        const admin = req.userJwt;

        const account = await User.findById(uid);

        if (!account) {
            return res.status(400).json({
                success: false,
                message: "client to update not found"
            });
        };

        const client = await User.findByIdAndUpdate(uid, newData, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Profile changes updated succesfully',
            admin:{
                completeName: admin.completeName,
                role: admin.role,
            },
            client: {
                completeName: client.completeName,
                username: client.username,
                role: client.role,
                createdAt: client.createdAt, 
                updatedAt: client.updatedAt
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'failed to update profile changes',
            error: err.message
        });
    }
};

export const deleteProfileByAdmin = async (req, res) => {
    try {
        const { uid } = req.params;
        const { adminPassword } = req.body;
        const admin = req.userJwt;
        
        const checkConfirmation = await verify(admin.password, adminPassword);

        if (!checkConfirmation) {
            return res.status(400).json({
                success: false,
                message: "The password provided wasn't correct, try again"
            });
        };

       const user = await User.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully ",
            admin:{
                completeName: admin.completeName,
                role: admin.role,
            },
            account: {
                username: user.username,
                status: user.status,
                createdAt: user.createdAt, 
                updatedAt: user.updatedAt
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "failed to delete the account",
            error: err.message
        });
    }
};
