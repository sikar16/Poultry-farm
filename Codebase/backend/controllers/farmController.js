const Farm = require("../model/farmModel");
const Subscription = require("../model/subscriptionPlanModel");
const User = require("../model/userModel");
const catchAsync = require("../ErrorHandler/catchAsync");
const AppError = require("../ErrorHandler/appError");
const inventoryModel = require("../model/inventoryModel");
const { payment } = require("./paymentController");
const subscriptionPlanModel = require("../model/subscriptionPlanModel");

exports.createFarm = catchAsync(async (req, res, next) => {
  const { farmName, location, subscriptionPlan, numOfBirds } = req.body;

  // Ensure the user is a Farm Manager
  if (req.user.role !== "admin") {
    return next(new AppError("Only Farm Managers can create a farm", 403));
  }

  // Check if the farm name already exists
  const existingFarm = await Farm.findOne({ farmName });
  if (existingFarm) {
    return next(new AppError("Farm with this name already exists", 400));
  }

  // Check if the subscription plan exists
  const plan = await Subscription.findById(subscriptionPlan);
  if (!plan) {
    return next(new AppError("Subscription plan not found", 404));
  }

  // Create the farm
  const newFarm = await Farm.create({
    farmName,
    location,
    subscriptionPlan,
    farmOwner: req.id,
    numOfBirds,
  });
  console.log(newFarm);
  // Add initial inventory entry for birds
  if (numOfBirds > 0) {
    await inventoryModel.create({
      farm: newFarm.id,
      type: "Bird",
      details: {
        bird: {
          poultryType: plan.planType, // Derived from the subscription plan
          age: 0, // Newborn birds start with age 0 weeks
          healthStatus: "Healthy",
        },
      },
      quantity: numOfBirds,
    });
  }

  const paymentLink = await payment(plan.price);

  res.status(201).json({
    status: "success",
    data: {
      farm: newFarm,
      paymentLink,
    },
    message: "Farm created successfully",
  });
});

// Update farm location by farm owner
exports.updateFarmLocation = catchAsync(async (req, res, next) => {
  const { farmId } = req.params;
  const { location } = req.body;

  // Find the farm by ID
  const farm = await Farm.findById(farmId);

  if (!farm) {
    return next(new AppError("Farm not found", 404));
  }

  // Ensure the user is the farm owner
  if (farm.farmOwner.toString() !== req.user.id) {
    return next(
      new AppError("You are not authorized to update the farm location", 403)
    );
  }

  // Update the farm location
  farm.location = location;
  await farm.save();

  res.status(200).json({
    status: "success",
    data: {
      farm,
    },
    message: "Farm location updated successfully",
  });
});

exports.addFarmWorker = catchAsync(async (req, res, next) => {
  const { farmId } = req.params;
  const { firstName, lastName, email, password, role } = req.body;
  if (!firstName || !lastName || !email || !password || !role) {
    return next(new AppError("all fields are required", 400));
  }

  // Find the farm by ID
  const farm = await Farm.findById(farmId);

  if (!farm) {
    return next(new AppError("Farm not found", 404));
  }

  // Ensure the user is the farm owner
  if (farm.farmOwner.toString() !== req.user.id) {
    return next(
      new AppError("You are not authorized to add workers to this farm", 403)
    );
  }

  // Check if the role is valid
  const validRoles = ["farmWorker", "poultrySpecialist"];
  if (!validRoles.includes(role)) {
    return next(
      new AppError(
        "Invalid role. Role must be 'farmWorker', 'poultrySpecialist'.",
        400
      )
    );
  }

  // Create a new user for the worker
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
  });

  // Add the new user (worker) to the farm's workers list
  farm.farmWorkers.push(newUser._id);
  await farm.save();

  res.status(201).json({
    status: "success",
    message: "Farm worker added successfully",
    data: {
      user: newUser,
      farm: farm,
    },
  });
});

// Get all farms with optional subscription plan filter (Superadmin access)
exports.getAllFarms = catchAsync(async (req, res, next) => {
  const { subscriptionPlan } = req.query;

  let filter = {}; // To store filtering criteria

  if (subscriptionPlan) {
    filter.subscriptionPlan = subscriptionPlan; // Filter farms by subscription plan if provided
  }

  // Find farms with the filter (if any)
  const farms = await Farm.find(filter)
    .populate("subscriptionPlan farmOwner farmWorkers") // Populate relevant fields for detailed data
    .exec();

  res.status(200).json({
    status: "success",
    data: {
      farms,
    },
  });
});

// Get a specific farm by its ID (Superadmin access)
exports.getFarmById = catchAsync(async (req, res, next) => {
  const { farmId } = req.params;

  // Find the farm by its ID and populate relevant fields
  const farm = await Farm.findById(farmId)
    .populate("subscriptionPlan farmOwner farmWorkers")
    .exec();

  if (!farm) {
    return next(new AppError("Farm not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      farm,
    },
  });
});

// Get all farms by the farm owner's user ID (Farm Owner access)
exports.getFarmsByOwner = catchAsync(async (req, res, next) => {
  const { ownerId } = req.params;

  // Find farms created by the given ownerId
  const farms = await Farm.find({ farmOwner: ownerId })
    .populate("subscriptionPlan farmOwner farmWorkers")
    .exec();

  if (!farms.length) {
    return next(new AppError("No farms found for this owner", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      farms,
    },
  });
});
