import { hash, verify } from "argon2";
import User from "../user/user.model.js";
import Cart from "../shoppingCart/cart.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";


export const register = async (req, res) => {
    try {
        const userReceived = req.body;

        const encryptedPassword = await hash(userReceived.password);

        userReceived.password = encryptedPassword;

        const user = await User.create(userReceived);

        return res.status(201).json({
            message: "User registered succesfully",
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

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({username: username});

        if (!user) {
            return res.status(400).json({
                message: "username not found, try again",
                error: "the user provided doesnt exists"
            });
        }

        const validPassword = await verify(user.password, password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Password incorrect",
                error: "the password you provided its incorrect"
            });
        }
        const token = await generateJWT(user._id);

        const shoppingCarts = await Cart.find({ client: user._id, status: "BOUGHT" }).populate('products.product');

        return res.status(200).json({
            message: "Login successful",
            account_information: {
                completeName: user.completeName,
                username: user.username,  
                role: user.role,  
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
            token: token,
            Bought: shoppingCarts
        });
    } catch (err) {
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        });
    }
};
