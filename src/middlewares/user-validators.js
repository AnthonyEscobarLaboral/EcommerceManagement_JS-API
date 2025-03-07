import { body, param } from "express-validator";
import { usernameExists, usernameFound, userFound,validRole } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
//hasRoles("ADMIN")

export const registerValidator = [
    body("completeName").notEmpty().withMessage("your complete name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    handleErrors
];

export const loginValidator = [
    body("username").notEmpty().withMessage("Username is required"),
    body("username").isString().withMessage("Username cannot be diferent but only text"),
    body("username").custom(usernameFound),
    body("password").isLength({ min: 8 }).withMessage("The password has to be at least 8 characters long"),
    validarCampos,
    handleErrors
];

export const changeClientProfileValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("The id provided is not a mongo valid ID"),
    param("uid").custom(userFound),
    body("completeName").optional(),
    body("username").optional(),
    validarCampos,
    handleErrors
];

export const changeClientPasswordValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("The id provided is not a mongo valid ID"),
    param("uid").custom(userFound),
    body("newPassword").isLength({ min: 8 }).withMessage("The password has to be at least 8 characters long"),
    validarCampos,
    handleErrors
];

export const disableClientAccountValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("The id provided is not a mongo valid ID"),
    param("uid").custom(userFound),
    body("password").isLength({ min: 8 }).withMessage("The password has to be at least 8 characters long"),
    validarCampos,
    handleErrors
];

// ADMINS VALIDATORS
export const createAccountByAdminValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("completeName").notEmpty().withMessage("your complete name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    body("role").notEmpty().withMessage("Role is required"),
    body("role").custom(validRole),
    validarCampos,
    handleErrors
];

export const changeRoleByAdminValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid").isMongoId().withMessage("The id provided is not a mongo valid ID"),
    param("uid").custom(userFound),
    body("newRole").notEmpty().withMessage("New role is required"),
    validarCampos,
    handleErrors
];

export const changeClientByAdminValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid").isMongoId().withMessage("The id provided is not a mongo valid ID"),
    param("uid").custom(userFound),
    body("completeName").optional(),
    body("username").optional(),
    validarCampos,
    handleErrors
];

export const deleteProfileByAdminValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid").isMongoId().withMessage("The id provided is not a mongo valid ID"),
    param("uid").custom(userFound),
    body("adminPassword").isLength({ min: 8 }).withMessage("The password has to be at least 8 characters long"),
    validarCampos,
    handleErrors
];
