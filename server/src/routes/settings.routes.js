const express = require("express");
const Settings = require("../models/Settings");
const requireAdmin = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const settings = await Settings.getSingleton();
  res.json(settings);
});

router.put("/", requireAdmin, async (req, res) => {
  const settings = await Settings.getSingleton();
  const fields = [
    "phones",
    "address",
    "hoursText",
    "instagramUrl",
    "doordashUrl",
    "uberEatsUrl",
    "postmatesUrl",
  ];
  for (const field of fields) {
    if (req.body[field] !== undefined) settings[field] = req.body[field];
  }
  await settings.save();
  res.json(settings);
});

module.exports = router;
