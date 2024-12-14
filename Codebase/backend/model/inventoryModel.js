const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema(
  {
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
    type: {
      type: String,
      enum: ["Bird", "Egg", "Feed"],
      required: true,
    },
    details: {
      bird: {
        poultryType: { type: String, enum: ["Broiler", "Hatchery", "Layer"] }, // Applicable for Birds
        age: { type: Number }, // Age in weeks
        healthStatus: { type: String, default: "Healthy" }, // e.g., Healthy, Sick, etc.
      },
      egg: {
        quality: { type: String, enum: ["Healthy", "Bad"] }, // Quality grades
        collectedDate: { type: Date },
      },
      feed: {
        feedType: { type: String }, // e.g., Starter, Grower, Finisher
        quantity: { type: Number }, // Weight in kg
        unit: { type: String, default: "kg" }, // Default unit is kilograms
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"], // Validation for stock levels
    },
    unit: {
      type: String,
      default: "count", // Default for most inventory types
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Middleware to validate `details` based on `type`
inventorySchema.pre("save", function (next) {
  if (this.type === "Bird" && !this.details.bird) {
    return next(new Error("Bird details must be provided for type 'Bird'."));
  }
  if (this.type === "Egg" && !this.details.egg) {
    return next(new Error("Egg details must be provided for type 'Egg'."));
  }
  if (this.type === "Feed" && !this.details.feed) {
    return next(new Error("Feed details must be provided for type 'Feed'."));
  }
  next();
});
// Ensure poultryType aligns with the farm's subscription plan
inventorySchema.pre("save", async function (next) {
  if (this.type === "Bird") {
    const farm = await mongoose
      .model("Farm")
      .findById(this.farm)
      .populate("subscriptionPlan");
    if (!farm) {
      return next(new Error("Associated farm not found."));
    }
    if (this.details.bird.poultryType !== farm.subscriptionPlan.planType) {
      return next(
        new Error("Poultry type does not match the farm's subscription plan.")
      );
    }
  }
  next();
});

module.exports = mongoose.model("Inventory", inventorySchema);
