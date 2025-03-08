import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/user-validators.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - 'Auth'
 *     summary: 'Register a new user'
 *     description: 'Allow a new user to register by providing necessary details.'
 *     operationId: 'register'
 *     requestBody:
 *       description: 'User registration data.'
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completeName:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [CLIENT, ADMIN]
 *     responses:
 *       '201':
 *         description: 'User registered successfully.'
 *       '400':
 *         description: 'Invalid data provided.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.post("/register", registerValidator, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - 'Auth'
 *     summary: 'Login a user'
 *     description: 'Allow a user to login using their credentials (username and password).'
 *     operationId: 'login'
 *     requestBody:
 *       description: 'User login credentials.'
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: 'Login successful, returns a token and user info.'
 *       '400':
 *         description: 'Invalid username or password.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.post("/login", loginValidator, login);

export default router;
