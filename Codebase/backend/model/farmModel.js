const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const farmSchema = new Schema(
  {
    farmName: { type: String, required: true },
    location: { type: String },
    farmType: {
      type: String,
      enum: ["Broiler", "Hatchery", "Layer", "All"],
    },
    subscriptionPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription", // Reference to the Subscription model
      required: [true, "Subscription plan is required"],
    },
    farmOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    farmWorkers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User model for workers
      },
    ],
    lastVaccinationDate: {
      type: Date,
    },
    nextVaccinationDate: {
      type: Date,
    },
    numOfBirds: {
      type: Number,
      required: true,
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

// Middleware to set the farmType based on the subscription plan
farmSchema.pre("save", async function (next) {
  if (!this.farmType) {
    const subscription = await mongoose
      .model("Subscription")
      .findById(this.subscriptionPlan);
    if (subscription.planType === "Full Package") {
      this.farmType = "All"; // Default or select as per your logic
    } else {
      this.farmType = subscription.planType; // Derive farm type from subscription
    }
  }

  // Calculate next vaccination date if it's not provided
  if (this.lastVaccinationDate && !this.nextVaccinationDate) {
    const vaccinationInterval = 30; // Adjust interval if needed
    this.nextVaccinationDate = new Date(this.lastVaccinationDate);
    this.nextVaccinationDate.setDate(
      this.nextVaccinationDate.getDate() + vaccinationInterval
    );
  }

  next();
});

module.exports = mongoose.model("Farm", farmSchema);
