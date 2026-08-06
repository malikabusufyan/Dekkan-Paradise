const path = require("path");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const menuRoutes = require("./routes/menu.routes");
const videoRoutes = require("./routes/video.routes");
const reviewRoutes = require("./routes/review.routes");
const settingsRoutes = require("./routes/settings.routes");

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // No Origin header (curl, server-to-server, same-origin) — allow.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/settings", settingsRoutes);

// Multer/general error handler — keeps upload/size errors from crashing as raw 500s.
app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ message: err.message || "Something went wrong" });
  }
  next();
});

module.exports = app;
