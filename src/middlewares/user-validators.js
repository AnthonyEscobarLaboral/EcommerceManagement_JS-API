import { body, param } from "express-validator";
import { emailExists, usernameExists, userFound } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import {validateJWT} from "./validate-jwt.js";

export const registerValidator = [
    body("completeName").notEmpty().withMessage("your complete name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("username").custom(usernameExists),
    body("email").notEmpty().withMessage("email is required"),
    body("email").isEmail().withMessage("the email you provided is not valid"),
    body("email").custom(emailExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    handleErrors
]

export const loginValidator = [
    body("emailOrUsername").isString().withMessage("Username or email is not correct, needs to be text"),
    body("password").isLength({min: 8}).withMessage("The password has to be at least 8 characters long"),
    validarCampos,
    handleErrors
]

export const changeClientProfileValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("The id provided is not a mongo valid ID"),
    param("uid").custom(userFound),
    body("completeName").notEmpty().withMessage("your complete name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("email is required"),
    body("email").isEmail().withMessage("the email you provided is not valid"),
    validarCampos,
    handleErrors
]

export const changeClientPasswordValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("The id provided is not a mongo valid ID"),
    param("uid").custom(userFound),
    body("newPassword").isLength({min: 8}).withMessage("The password has to be at least 8 characters long"),
    validarCampos,
    handleErrors
]

export const disableClientAccountValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("The id provided is not a mongo valid ID"),
    param("uid").custom(userFound),
    validarCampos,
    handleErrors
]



