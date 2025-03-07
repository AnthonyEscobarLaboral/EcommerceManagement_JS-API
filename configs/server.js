"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { hash } from "argon2";
import { dbConnection } from "./dbMongoConnection.js";
import authRoutes from "../src/auth/auth.routes.js";
import User from "../src/user/user.model.js";
import Category from "../src/category/category.model.js";
import userRoutes from "../src/user/user.routes.js";
import categoryRoutes from "../src/category/category.routes.js";

const configs = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
};

const routes = (app) => {
    app.use("/EcommerceManager/v1/auth", authRoutes);
    app.use("/EcommerceManager/v1/user", userRoutes);
    app.use("/EcommerceManager/v1/category", categoryRoutes);
};

const connectionDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const adminAccountDefault = async () => {
    try {
        const admin = await User.findOne({ role: "ADMIN" });
        if (admin) {
            return console.log(`An admin account already exists`);
        }

        const defaultAdmin = {
            completeName: "Braulio Jose Echeverria Montufar",
            username: "becheverria",
            role: "ADMIN",
        };

        const encryptedPassword = await hash("AdminPass@123");
        defaultAdmin.password = encryptedPassword;
        await User.create(defaultAdmin);

        return console.log(`Admin default account created succesfully`);

    } catch (err) {
        return console.log("theres no admin account");
    }
};

export const defaultCategory = async () => {
    try {
        const categoryFound = await Category.findOne({ name: "GENERAL" });
        if (categoryFound) {
            return console.log(`An default category already exists`);
        }
        const defaultCategory = {
            name: "GENERAL"
        }
        await Category.create(defaultCategory);

        return console.log(`Default category created succesfully`);

    } catch (err) {
        return console.error(`Error creating a default category:${err}`);
    }
};

export const initServer = () => {
    const app = express();
    try {
        configs(app);
        connectionDB();
        routes(app);
        adminAccountDefault();
        defaultCategory();
        app.listen(process.env.PORT);
        console.log(`Server running on port ${process.env.PORT}`);
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};
