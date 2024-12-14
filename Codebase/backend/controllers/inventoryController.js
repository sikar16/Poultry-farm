const catchAsync = require("../ErrorHandler/catchAsync");
const AppError = require("../ErrorHandler/appError");
const Inventory = require("../model/inventoryModel");
const Farm = require("../model/farmModel");

exports.createInventory = catchAsync(async (req, res, next) => {
  const { farm, type, details, quantity } = req.body;

  // Ensure the farm exists
  const existingFarm = await Farm.findById(farm).populate("subscriptionPlan");
  if (!existingFarm) {
    return next(new AppError("Farm not found", 404));
  }

  // Validate poultry type for "Bird"
  if (type === "Bird" && details.bird) {
    const { poultryType } = details.bird;
    if (poultryType !== existingFarm.subscriptionPlan.planType) {
      return next(
        new AppError(
          "Poultry type does not match the farm's subscription plan",
          400
        )
      );
    }
  }

  // Create the inventory item
  const newInventory = await Inventory.create({
    farm,
    type,
    details,
    quantity,
  });

  res.status(201).json({
    status: "success",
    data: {
      inventory: newInventory,
    },
    message: "Inventory item added successfully",
  });
});
exports.updateInventory = catchAsync(async (req, res, next) => {
  const { inventoryId } = req.params;
  const { quantity, details } = req.body;

  // Find the inventory item by ID
  const inventoryItem = await Inventory.findById(inventoryId);

  // Check if the inventory item exists
  if (!inventoryItem) {
    return next(new AppError("Inventory item not found", 404));
  }

  // Validate the quantity
  if (quantity !== undefined && quantity < 0) {
    return next(new AppError("Quantity cannot be negative", 400));
  }

  // Update inventory fields
  if (quantity !== undefined) inventoryItem.quantity = quantity;
  if (details !== undefined) inventoryItem.details = details;

  // Save the updated inventory item
  const updatedInventory = await inventoryItem.save();

  res.status(200).json({
    status: "success",
    data: {
      inventory: updatedInventory,
    },
    message: "Inventory item updated successfully",
  });
});
exports.getAllInventory = catchAsync(async (req, res, next) => {
  const farmId = req.params.farmId;

  // Verify the farm exists and belongs to the user
  const farm = await Farm.findById(farmId);

  // Fetch all inventory items for the farm
  const inventoryItems = await Inventory.find({ farm: farmId });

  res.status(200).json({
    status: "success",
    data: {
      inventory: inventoryItems,
    },
    message: "Inventory items retrieved successfully",
  });
});

exports.getInventoryById = catchAsync(async (req, res, next) => {
  const { inventoryId } = req.params;

  // Fetch the inventory item
  const inventoryItem = await Inventory.findById(inventoryId).populate(
    "farm",
    "farmOwner"
  );
  if (!inventoryItem) {
    return next(new AppError("Inventory item not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      inventory: inventoryItem,
    },
    message: "Inventory item retrieved successfully",
  });
});
