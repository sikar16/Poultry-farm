/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

const express = require("express");
const userController = require("../controllers/userController");
const { protect } = require("../Middleware/authorization");

const router = express.Router();

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                     user:
 *                       type: object
 *       400:
 *         description: Bad Request - Invalid data
 */
router.post("/signup", userController.register);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login as user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Unauthorized - Invalid credentials
 */
router.post("/login", userController.login);
/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users with specific roles (admin, superAdmin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         required: false
 *         schema:
 *           type: string
 *           enum: [admin, superAdmin, farmWorker, poultrySpecialist]
 *         description: The role of the users to fetch
 *     responses:
 *       200:
 *         description: List of users filtered by role
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid role parameter
 */
router.get("/", protect, userController.getAllUser);
/**
 * @swagger
 * /api/user/admin:
 *   get:
 *     summary: Get all admin
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid role parameter
 */
router.get("/admin", protect, userController.getAllAdmins);

/**
 * @swagger
 * /api/users-created-by-admins:
 *   get:
 *     tags: [Users]
 *     summary: Get all users (admins) who created farms and their associated farms
 *     description: Fetches all admins who have created farms, along with details of the farms they created.
 *     security:
 *       - bearerAuth: []
 * responses:
 *       200:
 *         description: Successfully fetched the admins and their farms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                   example: Fetched 1 admins and their farms successfully
 *       401:
 *         description: Unauthorized. User must be authenticated to access this endpoint.
 *       403:
 *         description: Forbidden. User does not have permission to access this resource.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/users-created-by-admins",
  protect,
  userController.getAllUsersCreatedByAdmins
);

module.exports = router;
