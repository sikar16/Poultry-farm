const express = require("express");
const subscriptionController = require("../controllers/subscriptionPlanController");
const { protect, restrictTo } = require("../Middleware/authorization");
const router = express.Router();

/**
 * @swagger
 * /api/subscriptions:
 *   post:
 *     summary: Create a new subscription plan (SuperAdmin only)
 *     tags: [SuperAdmins]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planType:
 *                 type: string
 *                 enum: [Broiler, Hatchery, Layer, Full Package]
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               validityPeriod:
 *                 type: number
 *             required:
 *               - planType
 *               - description
 *               - price
 *               - validityPeriod
 *     responses:
 *       201:
 *         description: Subscription plan created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 newSubscription:
 *                   $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Invalid input data
 *       403:
 *         description: Unauthorized access (SuperAdmin only)
 */

router.post(
  "/",
  protect, // Middleware to check if the user is authenticated
  restrictTo("SuperAdmin"), // Middleware to restrict access to SuperAdmin only
  subscriptionController.createSubscription
);

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   patch:
 *     summary: Update an existing subscription plan (SuperAdmin only)
 *     tags: [SuperAdmins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subscription plan
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               validityPeriod:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [Active, Expired, Pending]
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Invalid input data or no valid fields for update
 *       404:
 *         description: Subscription not found
 *       403:
 *         description: Unauthorized access (SuperAdmin only)
 */
router.patch(
  "/:id",
  protect,
  restrictTo("SuperAdmin"),
  subscriptionController.updateSubscription
);

/**
 * @swagger
 * /api/subscriptions:
 *   get:
 *     summary: Get all subscriptions
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 */
router.get("/", subscriptionController.getAllSubscriptions);

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   get:
 *     summary: Get a subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subscription plan
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The subscription plan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Subscription not found
 */
router.get("/:id", subscriptionController.getSubscriptionById);

module.exports = router;
