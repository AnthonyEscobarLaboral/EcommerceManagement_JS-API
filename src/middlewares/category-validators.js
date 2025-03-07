import { body, param } from "express-validator";
import { categoryFound } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("name").notEmpty().withMessage("The category name is required"),
    validarCampos,
    handleErrors
]

export const getCategorysValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    validarCampos,
    handleErrors
]

export const editCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("cid").isMongoId().withMessage("The id provided is not a mongo valid id"),
    param("cid").custom(categoryFound),
    body("newCategoryName").notEmpty().withMessage("New category name is required to a category update"),
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("cid").isMongoId().withMessage("The id provided is not a mongo valid id"),
    param("cid").custom(categoryFound),
    validarCampos,
    handleErrors
]
