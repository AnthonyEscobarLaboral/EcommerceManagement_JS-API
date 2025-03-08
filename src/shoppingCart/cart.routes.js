import { Router } from "express";
import { newShoopingCart, shoppingCartBought } from "./cart.controller.js";
import { newShoopingCartValidator, shoppingCartBoughtValidator } from "../middlewares/cart-validators.js";

const router = Router();

/**
 * @swagger
 * /cart/newCart:
 *   post:
 *     tags:
 *       - 'Cart'
 *     summary: 'Create or update a shopping cart'
 *     description: 'Creates a new shopping cart or updates an existing one by adding products.'
 *     operationId: 'newShoopingCart'
 *     requestBody:
 *       description: 'The products to be added to the cart.'
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       '201':
 *         description: 'Shopping cart created successfully.'
 *       '200':
 *         description: 'Shopping cart updated successfully.'
 *       '400':
 *         description: 'Invalid cart data or request.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.post("/newCart", newShoopingCartValidator, newShoopingCart);

/**
 * @swagger
 * /cart/shoppingCartBought:
 *   patch:
 *     tags:
 *       - 'Cart'
 *     summary: 'Complete the shopping cart purchase'
 *     description: 'Allows a client to mark their shopping cart as "BOUGHT" and process the purchase.'
 *     operationId: 'shoppingCartBought'
 *     responses:
 *       '201':
 *         description: 'Shopping cart purchased successfully.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.patch("/shoppingCartBought", shoppingCartBoughtValidator, shoppingCartBought);

export default router;
