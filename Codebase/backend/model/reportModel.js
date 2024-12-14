const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
    poultryType: {
      type: String,
      enum: ["Broiler", "Layer", "Hatchery"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    birdStats: {
      totalBirds: { type: Number, default: 0 }, // Current bird count
      mortalityRate: { type: Number, default: 0 }, // % of birds that died
    },
    feedStats: {
      totalFeedConsumed: { type: Number, default: 0 }, // Feed consumption in kg
      unit: { type: String, default: "kg" },
    },
    financialStats: {
      totalCost: { type: Number, default: 0 }, // Total cost (medicine, feed, etc.)
      revenue: { type: Number, default: 0 }, // Revenue from sales
      profit: { type: Number, default: 0 }, // Revenue - Expenditure
    },
    specificStats: {
      broiler: {
        meatSold: { type: Number, default: 0 }, // Total kg of meat sold
      },
      layer: {
        eggsProduced: { type: Number, default: 0 }, // Total eggs produced
        eggsSold: { type: Number, default: 0 }, // Total eggs sold
        badEggs: { type: Number, default: 0 }, // Number of bad eggs
      },
      hatchery: {
        chicksHatched: { type: Number, default: 0 }, // Total chicks hatched
        hatchSuccessRate: { type: Number, default: 0 }, // % of successful hatches
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tracks the user who created the report
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

module.exports = mongoose.model("Report", reportSchema);
