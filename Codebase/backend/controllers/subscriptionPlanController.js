const Subscription = require("../model/subscriptionPlanModel");
const AppError = require("../ErrorHandler/appError");
const catchAsync = require("../ErrorHandler/catchAsync");

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: Manage subscription plans
 */
exports.createSubscription = catchAsync(async (req, res, next) => {
  const { planType, description, price, validityPeriod } = req.body;

  // Validate required fields
  if (!planType || !description || !price || !validityPeriod) {
    return next(new AppError("All fields are required", 400));
  }

  // Ensure the user has the role of SuperAdmin
  if (req.user.role !== "SuperAdmin") {
    return next(
      new AppError("You do not have permission to perform this action", 403)
    );
  }

  // Check if a subscription plan with the same type already exists
  const existingPlan = await Subscription.findOne({ planType });
  if (existingPlan) {
    return next(
      new AppError("A subscription plan with this type already exists", 400)
    );
  }

  // Create the subscription plan
  const newSubscription = await Subscription.create({
    planType,
    description,
    price,
    validityPeriod,
  });

  res.status(201).json({
    data: {
      message: "Subscription plan created successfully",
      newSubscription,
    },
  });
});
exports.updateSubscription = catchAsync(async (req, res, next) => {
  const id = req.params.id; // Subscription ID
  const allowedUpdates = ["description", "price", "validityPeriod", "status"];
  const updates = req.body;

  // Filter updates to only include allowed fields
  const updateFields = Object.keys(updates).filter((key) =>
    allowedUpdates.includes(key)
  );

  if (updateFields.length === 0) {
    return next(new AppError("No valid fields provided for update", 400));
  }

  // Update the subscription in the database
  const updatedSubscription = await Subscription.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!updatedSubscription) {
    return next(new AppError("Subscription not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: updatedSubscription,
    message: "Subscription updated successfully",
  });
});
exports.getAllSubscriptions = catchAsync(async (req, res, next) => {
  const subscriptions = await Subscription.find(); // Get all subscriptions from the database

  res.status(200).json({
    status: "success",
    data: subscriptions,
    message: "Fetched all subscriptions successfully",
  });
});
exports.getSubscriptionById = catchAsync(async (req, res, next) => {
  const id = req.params.id; // Subscription ID

  const subscription = await Subscription.findById(id); // Find the subscription by ID

  if (!subscription) {
    return next(new AppError("Subscription not found", 404)); // Handle if the subscription is not found
  }

  res.status(200).json({
    status: "success",
    data: subscription,
    message: "Fetched subscription successfully",
  });
});
