const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaccinationScheduleSchema = new Schema(
  {
    poultryType: {
      type: String,
      enum: ["Broiler", "Layer", "Hatchery"],
      required: true,
    },
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
    vaccineName: {
      type: String,
      required: true,
    },
    vaccinationDate: {
      type: Date,
      required: true,
    },
    notificationSent: {
      type: Boolean,
      default: false, // To avoid duplicate notifications
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

module.exports = mongoose.model(
  "VaccinationSchedule",
  vaccinationScheduleSchema
);
