import User from "../user/user.model.js";

export const usernameExists = async (username = "") => {
    const exists = await User.findOne({ username });
    if (exists) {
        throw new Error(`The username ${username} is already registered`);
    }
};

export const userFound = async (uid = " ") => {
    const exists = await User.findById(uid);
    if (!exists) {
        throw new Error(`The user provided doesnt exists`);
    }
};

export const usernameFound = async (username = " ") => {
    const found = await User.findOne({ username });
    if (!found) {
        throw new Error(`The username provided doesnt exists`);
    }
};

export const validRole = async (role = " ") => {
    if (role !== "ADMIN" && role !== "CLIENT") {
        throw new Error(`Unvalid role`);
    };
};
