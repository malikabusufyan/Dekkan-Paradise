const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    phones: { type: [String], default: [] },
    address: { type: String, default: "" },
    hoursText: { type: String, default: "" },
    instagramUrl: { type: String, default: "" },
    doordashUrl: { type: String, default: "" },
    uberEatsUrl: { type: String, default: "" },
    postmatesUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

// Singleton accessor: there is always exactly one Settings document.
settingsSchema.statics.getSingleton = async function () {
  let doc = await this.findOne();
  if (!doc) {
    doc = await this.create({});
  }
  return doc;
};

module.exports = mongoose.model("Settings", settingsSchema);
