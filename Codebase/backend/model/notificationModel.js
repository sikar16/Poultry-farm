const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Vaccination", "Low Stock", "General"],
      required: true,
    },
    relatedData: {
      // Links to specific entities
      feedStockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
        default: null,
      },
      vaccinationScheduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VaccinationSchedule",
        default: null,
      },
    },
    read: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("Notification", notificationSchema);
