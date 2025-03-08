import { Router } from "express";
import { changeClientProfile, changeClientPassword, disableClientAccount, changeRoleByAdmin, createAccountByAdmin, changeClientByAdmin, deleteProfileByAdmin } from "./user.controller.js";
import { changeClientProfileValidator, changeClientPasswordValidator, disableClientAccountValidator, changeRoleByAdminValidator,
    createAccountByAdminValidator, changeClientByAdminValidator, deleteProfileByAdminValidator } from "../middlewares/user-validators.js";

const router = Router();

/**
 * @swagger
 * /user/updateClientProfile/{uid}:
 *   put:
 *     tags:
 *       - 'User'
 *     summary: 'Change the profile of a client'
 *     description: 'Allow the client to update their profile information.'
 *     operationId: 'changeClientProfile'
 *     parameters:
 *       - in: 'path'
 *         name: 'uid'
 *         required: true
 *         schema:
 *           type: string
 *         description: 'User ID of the client whose profile needs to be updated.'
 *     requestBody:
 *       description: 'Profile data to update.'
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completeName:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       '200':
 *         description: 'Profile updated successfully.'
 *       '400':
 *         description: 'Invalid input or insufficient permissions.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.put("/updateClientProfile/:uid", changeClientProfileValidator, changeClientProfile);

/**
 * @swagger
 * /user/updateClientPassword/{uid}:
 *   patch:
 *     tags:
 *       - 'User'
 *     summary: 'Change the password of a client'
 *     description: 'Allow a client to update their password.'
 *     operationId: 'changeClientPassword'
 *     parameters:
 *       - in: 'path'
 *         name: 'uid'
 *         required: true
 *         schema:
 *           type: string
 *         description: 'User ID of the client whose password needs to be updated.'
 *     requestBody:
 *       description: 'Password change data.'
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: 'Password updated successfully.'
 *       '400':
 *         description: 'Invalid or incorrect password.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.patch("/updateClientPassword/:uid", changeClientPasswordValidator, changeClientPassword);

/**
 * @swagger
 * /user/deleteClientAccount/{uid}:
 *   delete:
 *     tags:
 *       - 'User'
 *     summary: 'Delete a client account'
 *     description: 'Allow a client to delete their own account.'
 *     operationId: 'disableClientAccount'
 *     parameters:
 *       - in: 'path'
 *         name: 'uid'
 *         required: true
 *         schema:
 *           type: string
 *         description: 'User ID of the client to delete their account.'
 *     requestBody:
 *       description: 'Client password for account deletion confirmation.'
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: 'Account deleted successfully.'
 *       '400':
 *         description: 'Incorrect password or insufficient permissions.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.delete("/deleteClientAccount/:uid", disableClientAccountValidator, disableClientAccount);

/**
 * @swagger
 * /user/adminAddNewAccount:
 *   post:
 *     tags:
 *       - 'User'
 *     summary: 'Admin creates a new user account'
 *     description: 'Allow an admin to create a new user account.'
 *     operationId: 'createAccountByAdmin'
 *     requestBody:
 *       description: 'Account data for the new user.'
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
 *         description: 'User created successfully.'
 *       '400':
 *         description: 'Invalid data provided.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.post("/adminAddNewAccount", createAccountByAdminValidator, createAccountByAdmin);

/**
 * @swagger
 * /user/changeRole/{uid}:
 *   patch:
 *     tags:
 *       - 'User'
 *     summary: 'Admin changes user role'
 *     description: 'Allow an admin to change the role of a user.'
 *     operationId: 'changeRoleByAdmin'
 *     parameters:
 *       - in: 'path'
 *         name: 'uid'
 *         required: true
 *         schema:
 *           type: string
 *         description: 'User ID of the user whose role is to be changed.'
 *     requestBody:
 *       description: 'New role for the user.'
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newRole:
 *                 type: string
 *                 enum: [CLIENT, ADMIN]
 *     responses:
 *       '200':
 *         description: 'Role updated successfully.'
 *       '400':
 *         description: 'Invalid role or insufficient permissions.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.patch("/changeRole/:uid", changeRoleByAdminValidator, changeRoleByAdmin);

/**
 * @swagger
 * /user/adminEditAccount/{uid}:
 *   put:
 *     tags:
 *       - 'User'
 *     summary: 'Admin edits a user account'
 *     description: 'Allow an admin to update details of an existing user account.'
 *     operationId: 'changeClientByAdmin'
 *     parameters:
 *       - in: 'path'
 *         name: 'uid'
 *         required: true
 *         schema:
 *           type: string
 *         description: 'User ID of the user whose account needs to be edited.'
 *     requestBody:
 *       description: 'Updated user account details.'
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
 *     responses:
 *       '200':
 *         description: 'Account edited successfully.'
 *       '400':
 *         description: 'Invalid data or insufficient permissions.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.put("/adminEditAccount/:uid", changeClientByAdminValidator, changeClientByAdmin);

/**
 * @swagger
 * /user/adminDeleteAccount/{uid}:
 *   delete:
 *     tags:
 *       - 'User'
 *     summary: 'Admin deletes a user account'
 *     description: 'Allow an admin to delete a user account.'
 *     operationId: 'deleteProfileByAdmin'
 *     parameters:
 *       - in: 'path'
 *         name: 'uid'
 *         required: true
 *         schema:
 *           type: string
 *         description: 'User ID of the account to be deleted.'
 *     requestBody:
 *       description: 'Admin password to confirm the deletion.'
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adminPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: 'Account deleted successfully.'
 *       '400':
 *         description: 'Incorrect password or insufficient permissions.'
 *       '500':
 *         description: 'Internal server error.'
 */
router.delete("/adminDeleteAccount/:uid", deleteProfileByAdminValidator, deleteProfileByAdmin);

export default router;
