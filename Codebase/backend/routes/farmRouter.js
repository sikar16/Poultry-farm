const express = require("express");
const farmController = require("../controllers/farmController");
const { protect, restrictTo } = require("../Middleware/authorization");
const router = express.Router();

// Route to create a farm

/**
 * @swagger
 * tags:
 *   name: Farms
 *   description: Operations related to farm management
 */

/**
 * @swagger
 * /api/farm:
 *   post:
 *     summary: Create a new farm (Admin or farm owner)
 *     description: This endpoint allows an admin to create a farm.
 *     tags:
 *       - Farms
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - farmName
 *               - subscriptionPlan
 *             properties:
 *               farmName:
 *                 type: string
 *                 description: Name of the farm
 *               numbersOfBird:
 *                  type: string
 *               location:
 *                 type: string
 *                 description: Location of the farm
 *               subscription:
 *                 type: string
 *                 description: ID of the subscription plan for the farm
 *     responses:
 *       201:
 *         description: Farm created successfully
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
 *                   properties:
 *                     farm:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         farmName:
 *                           type: string
 *                         location:
 *                           type: string
 *                         subscriptionPlan:
 *                           type: string
 *                         farmOwner:
 *                           type: string
 *       403:
 *         description: Forbidden - Only Farm Managers can create a farm
 *       404:
 *         description: Subscription plan not found
 */
router.post("/", protect, restrictTo("admin"), farmController.createFarm);

/**
 * @swagger
 * /api/farm/{farmId}/location:
 *   patch:
 *     summary: Update farm location (Only farm owner)
 *     description: This endpoint allows the farm owner to update the location of the farm.
 *     tags:
 *       - Farms
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: farmId
 *         required: true
 *         description: ID of the farm
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - location
 *             properties:
 *               location:
 *                 type: string
 *                 description: New location of the farm
 *     responses:
 *       200:
 *         description: Farm location updated successfully
 *       403:
 *         description: Forbidden - Only farm owner can update the location
 *       404:
 *         description: Farm not found
 */
router.patch(
  "/:farmId/location",
  protect,
  restrictTo("admin"),
  farmController.updateFarmLocation
);

/**
 * @swagger
 * /api/farm/{farmId}/workers:
 *   patch:
 *     summary: Register a new worker to the farm (Only farm owner)
 *     description: This endpoint allows the farm owner to register a new worker and assign a role.
 *     tags:
 *       - Farms
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: farmId
 *         required: true
 *         description: ID of the farm
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the new worker
 *               email:
 *                 type: string
 *                 description: The email of the new worker
 *               password:
 *                 type: string
 *                 description: The password for the new worker's account
 *               role:
 *                 type: string
 *                 description: The role of the worker (worker, specialist, admin)
 *     responses:
 *       201:
 *         description: Farm worker registered successfully
 *       403:
 *         description: Forbidden - Only farm owner can register workers
 *       404:
 *         description: Farm not found
 *       400:
 *         description: Invalid role
 */
router.patch(
  "/:farmId/workers",
  protect,
  restrictTo("admin"),
  farmController.addFarmWorker
);

/**
 * @swagger
 * /api/farms:
 *   get:
 *     summary: Get all farms with optional filtering by subscription plan (Superadmin access)
 *     description: This endpoint allows the superadmin to retrieve all farms with the option to filter by subscription plan.
 *     tags:
 *       - Farms
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subscriptionPlan
 *         required: false
 *         description: ID of the subscription plan to filter farms by
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved all farms
 *       404:
 *         description: No farms found with the specified filter
 */
router.get("/", protect, restrictTo("SuperAdmin"), farmController.getAllFarms);

/**
 * @swagger
 * /api/farm/{farmId}:
 *   get:
 *     summary: Get farm details by farm ID (Superadmin access)
 *     description: This endpoint allows the superadmin to retrieve the details of a specific farm by its ID.
 *     tags:
 *       - Farms
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: farmId
 *         required: true
 *         description: ID of the farm to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved farm details
 *       404:
 *         description: Farm not found
 */
router.get(
  "/:farmId",
  protect,
  restrictTo("SuperAdmin"),
  farmController.getFarmById
);

/**
 * @swagger
 * /api/farm/owner/{ownerId}:
 *   get:
 *     summary: Get farms by farm owner ID (Farm Owner access)
 *     description: This endpoint allows the farm owner to retrieve all farms they have created by their user ID.
 *     tags:
 *       - Farms
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         description: ID of the farm owner to retrieve farms for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved farms by owner ID
 *       404:
 *         description: No farms found for the specified owner ID
 */
router.get(
  "/owner/:ownerId",
  protect,
  restrictTo("admin", "SuperAdmin"),
  farmController.getFarmsByOwner
);

module.exports = router;
