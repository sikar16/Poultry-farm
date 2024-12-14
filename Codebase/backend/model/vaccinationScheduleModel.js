const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaccinationScheduleSchema = new Schema(
  {
    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
    poultryType: {
      type: String,
      enum: ["Broiler", "Layer", "Hatchery"],
    },
    vaccineName: {
      type: String,
      required: true,
    },
    vaccinationDate: {
      type: Date,
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
