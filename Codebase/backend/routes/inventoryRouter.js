const express = require("express");
const inventoryController = require("../controllers/inventoryController");
const { protect, restrictTo } = require("../Middleware/authorization");

const router = express.Router();

// Route to create inventory
router.post(
  "/",
  protect,
  restrictTo("admin", "farmWorker"),
  inventoryController.createInventory
);

router.patch(
  "/:inventoryId",
  protect,
  restrictTo("admin", "farmWorker"), // Only farm managers (admins) can update inventory
  inventoryController.updateInventory
);

router.get(
  "/farm/:farmId",
  protect,
  restrictTo("admin", "farmWorker"), // Only farm managers (admins) can view inventory
  inventoryController.getAllInventory
);

router.get(
  "/:inventoryId",
  protect,
  restrictTo("admin", "farmWorker"), // Only farm managers (admins) can view inventory items
  inventoryController.getInventoryById
);

module.exports = router;
