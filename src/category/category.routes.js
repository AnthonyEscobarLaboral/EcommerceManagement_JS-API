import { Router } from "express";
import { createCategory, getCategorys, editCategory, deleteCategory } from "./category.controller.js";
import { createCategoryValidator, getCategorysValidator, editCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

/**
 * @swagger
 * /category/newCategory:
 *   post:
 *     tags:
 *       - 'Category'
 *     summary: 'Create a new category'
 *     description: 'Allows the admin to create a new product category.'
 *     operationId: 'createCategory'
 *     requestBody:
 *       description: 'The category name to be created.'
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: 'Category created successfully.'
 *       '400':
 *         description: 'Category name already exists or invalid data.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.post("/newCategory", createCategoryValidator, createCategory);

/**
 * @swagger
 * /category/getCategorys:
 *   get:
 *     tags:
 *       - 'Category'
 *     summary: 'Get all categories'
 *     description: 'Retrieve all categories, either for an admin or a client.'
 *     operationId: 'getCategorys'
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 'The number of categories to return.'
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *           default: 0
 *         description: 'The starting point of categories to retrieve.'
 *     responses:
 *       '200':
 *         description: 'Successfully fetched categories.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.get("/getCategorys", getCategorysValidator, getCategorys);

/**
 * @swagger
 * /category/updateCategory/{cid}:
 *   patch:
 *     tags:
 *       - 'Category'
 *     summary: 'Edit an existing category'
 *     description: 'Allows the admin to update an existing category name.'
 *     operationId: 'editCategory'
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: 'The ID of the category to update.'
 *         schema:
 *           type: string
 *     requestBody:
 *       description: 'New category name.'
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newCategoryName:
 *                 type: string
 *     responses:
 *       '201':
 *         description: 'Category updated successfully.'
 *       '400':
 *         description: 'Invalid category ID or data.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.patch("/updateCategory/:cid", editCategoryValidator, editCategory);

/**
 * @swagger
 * /category/deleteCategory/{cid}:
 *   delete:
 *     tags:
 *       - 'Category'
 *     summary: 'Delete a category'
 *     description: 'Allows the admin to delete an existing category.'
 *     operationId: 'deleteCategory'
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: 'The ID of the category to delete.'
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: 'Category deleted successfully.'
 *       '400':
 *         description: 'Invalid category ID.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;
