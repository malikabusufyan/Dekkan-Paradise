const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    source: { type: String, enum: ["google", "website"], default: "website" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
