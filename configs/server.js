"use strict"

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./dbMongoConnection.js";
import authRoutes from "../src/auth/auth.routes.js";
import User from "../src/user/user.model.js";
import userRoutes from "../src/user/user.routes.js";

const configs = (app) => {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app) =>{
    app.use("/EcommerceManager/v1/auth", authRoutes)
    app.use("/EcommerceManager/v1/clients", userRoutes)
}

const connectionDB = async () => {
    try {
        await dbConnection()
    } catch (err) {
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}


export const adminAccountDefault = async () => {
    try {
        const admin = await User.findOne({ role: "ADMIN" });
        if (admin) {
            return console.log(`An admin account already exists:${admin}`);
        }

        const defaultAdmin = {
            completeName: "Braulio Jose Echeverria Montufar",
            email: "becheverria@gmail.com",
            username: "becheverria",
            role: "ADMIN",
        }

        const encryptedPassword = await hash("AdminPass@123");
        defaultAdmin.password = encryptedPassword;
        await User.create(defaultAdmin);

        return console.log(`Admin default account created succesfully:${defaultAdmin}`);

    } catch (err) {
        return console.log("theres no admin account");
    }

}

export const initServer = () => {
    const app = express()
    try {
        configs(app)
        connectionDB()
        routes(app)
        adminAccountDefault()
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}

