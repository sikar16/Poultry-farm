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
      enum: ["Bird", "Egg", "Feed", "Medication", "Miscellaneous"],
      required: true,
    },
    details: {
      bird: {
        poultryType: { type: String, enum: ["Broiler", "Hatchery", "Layer"] }, // Applicable for Birds
        age: { type: Number }, // Age in weeks
        healthStatus: { type: String, default: "Healthy" }, // e.g., Healthy, Sick, etc.
      },
      egg: {
        quality: { type: String, enum: ["A", "B", "C"] }, // Quality grades
        collectedDate: { type: Date },
      },
      feed: {
        feedType: { type: String }, // e.g., Starter, Grower, Finisher
        quantity: { type: Number }, // Weight in kg
        unit: { type: String, default: "kg" }, // Default unit is kilograms
      },
      medication: {
        medicationName: { type: String },
        dosage: { type: String },
        expiryDate: { type: Date },
      },
      miscellaneous: {
        itemName: { type: String },
        description: { type: String },
      },
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      default: "count", // Default for most inventory types
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tracks who added the inventory item
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timeStamps: true,
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

module.exports = mongoose.model("Inventory", inventorySchema);
