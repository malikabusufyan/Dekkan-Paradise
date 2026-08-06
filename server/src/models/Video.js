const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    sourceType: { type: String, enum: ["upload", "embed"], required: true },
    videoPath: { type: String, default: "" }, // set when sourceType === "upload"
    embedUrl: { type: String, default: "" }, // set when sourceType === "embed" (e.g. a Facebook reel link)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
