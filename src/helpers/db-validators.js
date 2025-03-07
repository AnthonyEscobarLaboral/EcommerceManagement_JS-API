import User from "../user/user.model.js";
import Category from "../category/category.model.js"
import Product from "../product/product.model.js"

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

export const categoryNameFound = async (name = " ") => {
    const found = await Category.findOne({name})
    if(!found){
        throw new Error(`The category provided does not exists nor it could be found`)
    };
};

export const productNameFound = async (name = " ") => {
    const found = await Product.findOne({name})
    if(!found){
        throw new Error(`The prodict name provided does not exists nor it could be found`)
    };
};

export const categoryFound = async (cid = " ") => {
    const found = await Category.findById(cid)
    if(!found){
        throw new Error(`The category provided does not exists nor it could be found`)
    };
};

export const productFound = async (pid = " ") => {
    const found = await Product.findById(pid)
    if(!found){
        throw new Error(`The product provided does not exists nor it could be found`)
    };
};