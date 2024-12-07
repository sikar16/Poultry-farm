const poultrySchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Broiler", "Layer", "Hatchery"],
      required: true,
    },
    count: { type: Number, required: true },
    age: { type: Number, default: 0 }, // Age in days
    farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
    createdAt: { type: Date, default: Date.now },
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

module.exports = mongoose.model("Poultry", poultrySchema);
