import { body, param } from "express-validator";
import { categoryFound,productFound,productNameFound } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const addNewProductValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("name").notEmpty().withMessage("Products name is required"),
    body("category").notEmpty().withMessage("Products category is required"),
    body("category").custom(categoryFound),
    body("price").notEmpty().withMessage("The price is required"),
    body("totalProduct").notEmpty().withMessage("Stock of product is required"),
    validarCampos,
    handleErrors
]

export const getSoldOutProductsForAdminValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    validarCampos,
    handleErrors
]

export const editProductValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("pid").isMongoId().withMessage("The id provided is not a mongo valid id"),
    param("pid").custom(productFound),
    body("name").optional(),
    body("category").optional().custom(categoryFound),
    body("price").optional(),
    body("totalProduct").optional(),
    validarCampos,
    handleErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("pid").isMongoId().withMessage("The id provided is not a mongo valid id"),
    param("pid").custom(productFound),
    validarCampos,
    handleErrors
]

/************************************************* */
export const getProductsValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]

export const findProductsValidator = [
    validateJWT,
    body("pid").optional().isMongoId().withMessage("The id provided is not a mongo valid id"),
    body("pid").optional().custom(productFound),
    body("name").optional().custom(productNameFound),
    body("category").optional().custom(categoryFound),
    body("mostSold").optional(),
    validarCampos,
    handleErrors
]
