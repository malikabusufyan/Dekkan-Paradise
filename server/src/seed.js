require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const MenuItem = require("./models/MenuItem");
const Review = require("./models/Review");
const Video = require("./models/Video");
const Admin = require("./models/Admin");
const Settings = require("./models/Settings");
const { menuItems, videos, reviews, defaultSettings } = require("./seedData");

async function seed() {
  await connectDB();

  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    throw new Error("ADMIN_USERNAME and ADMIN_PASSWORD must be set in server/.env before seeding");
  }

  // Admin account — upsert so re-running seed doesn't create duplicates.
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await Admin.findOneAndUpdate(
    { username: ADMIN_USERNAME },
    { username: ADMIN_USERNAME, passwordHash },
    { upsert: true, new: true }
  );
  console.log(`Admin account ready: ${ADMIN_USERNAME}`);

  // Menu — only seed if empty, so it never overwrites admin edits on re-run.
  const menuCount = await MenuItem.countDocuments();
  if (menuCount === 0) {
    await MenuItem.insertMany(menuItems);
    console.log(`Seeded ${menuItems.length} menu items`);
  } else {
    console.log(`Menu already has ${menuCount} items, skipping menu seed`);
  }

  // Videos — same guard.
  const videoCount = await Video.countDocuments();
  if (videoCount === 0) {
    await Video.insertMany(videos);
    console.log(`Seeded ${videos.length} videos`);
  } else {
    console.log(`Videos already exist (${videoCount}), skipping video seed`);
  }

  // Reviews — same guard.
  const reviewCount = await Review.countDocuments();
  if (reviewCount === 0) {
    await Review.insertMany(reviews);
    console.log(`Seeded ${reviews.length} placeholder reviews`);
  } else {
    console.log(`Reviews already exist (${reviewCount}), skipping review seed`);
  }

  // Settings — create the singleton if missing, otherwise leave admin's edits alone.
  const existingSettings = await Settings.findOne();
  if (!existingSettings) {
    await Settings.create(defaultSettings);
    console.log("Seeded default settings");
  } else {
    console.log("Settings already exist, skipping settings seed");
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
