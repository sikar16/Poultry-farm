const mongoose = require("mongoose");
const counterSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
