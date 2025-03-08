import { Router } from "express";
import { addNewProduct, getSoldOutProductsForAdmin, editProduct, deleteProduct, getProducts, findProducts } from "./product.controller.js";
import { addNewProductValidator, getSoldOutProductsForAdminValidator, editProductValidator, deleteProductValidator, getProductsValidator, findProductsValidator } from "../middlewares/product-validators.js";

const router = Router();

/**
 * @swagger
 * /product/newProduct:
 *   post:
 *     tags:
 *       - 'Product'
 *     summary: 'Create a new product'
 *     description: 'Allows an admin to create a new product.'
 *     operationId: 'addNewProduct'
 *     requestBody:
 *       description: 'Product data to be created.'
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               totalProduct:
 *                 type: number
 *     responses:
 *       '201':
 *         description: 'Product created successfully.'
 *       '400':
 *         description: 'Invalid product data.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.post("/newProduct", addNewProductValidator, addNewProduct);

/**
 * @swagger
 * /product/getSoldOuts:
 *   get:
 *     tags:
 *       - 'Product'
 *     summary: 'Get sold out products for admin'
 *     description: 'Retrieve all products with zero stock (sold out) for the admin.'
 *     operationId: 'getSoldOutProductsForAdmin'
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: 'The number of sold out products to retrieve.'
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 'The starting point for pagination.'
 *     responses:
 *       '200':
 *         description: 'Successfully fetched sold out products.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.get("/getSoldOuts", getSoldOutProductsForAdminValidator, getSoldOutProductsForAdmin);

/**
 * @swagger
 * /product/editProduct/{pid}:
 *   put:
 *     tags:
 *       - 'Product'
 *     summary: 'Edit a product'
 *     description: 'Allows an admin to edit a product.'
 *     operationId: 'editProduct'
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: 'Product ID to be edited.'
 *         schema:
 *           type: string
 *     requestBody:
 *       description: 'Updated product data.'
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               totalProduct:
 *                 type: number
 *     responses:
 *       '201':
 *         description: 'Product updated successfully.'
 *       '400':
 *         description: 'Invalid product ID or data.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.put("/editProduct/:pid", editProductValidator, editProduct);

/**
 * @swagger
 * /product/deleteProduct/{pid}:
 *   delete:
 *     tags:
 *       - 'Product'
 *     summary: 'Delete a product'
 *     description: 'Allows an admin to delete a product.'
 *     operationId: 'deleteProduct'
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: 'Product ID to be deleted.'
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: 'Product deleted successfully.'
 *       '400':
 *         description: 'Invalid product ID.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.delete("/deleteProduct/:pid", deleteProductValidator, deleteProduct);

/**
 * @swagger
 * /product/products:
 *   get:
 *     tags:
 *       - 'Product'
 *     summary: 'Get all active products'
 *     description: 'Retrieve all active products for either admin or client.'
 *     operationId: 'getProducts'
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 'The number of products to retrieve.'
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 'The starting point for pagination.'
 *     responses:
 *       '200':
 *         description: 'Successfully fetched products.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.get("/products", getProductsValidator, getProducts);

/**
 * @swagger
 * /product/findProducts:
 *   get:
 *     tags:
 *       - 'Product'
 *     summary: 'Find products based on filters'
 *     description: 'Allows an admin or client to find products using specific filters like name, category, or most sold.'
 *     operationId: 'findProducts'
 *     requestBody:
 *       description: 'Filters for finding products.'
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pid:
 *                 type: string
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               mostSold:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: 'Successfully found products.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.get("/findProducts", findProductsValidator, findProducts);

export default router;
