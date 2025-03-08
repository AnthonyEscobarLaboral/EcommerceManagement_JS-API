import { body, param } from "express-validator";
import {productFound } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";


export const newShoopingCartValidator = [
    validateJWT,
    body("products").isArray().withMessage("Products must be an array"),
    body("products.*.product").custom(productFound).withMessage("Product does not exist"),
    body("products.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be greater than 0"),
    validarCampos,
    handleErrors
];

export const shoppingCartBoughtValidator = [
    validateJWT,
    validarCampos,
    handleErrors
];