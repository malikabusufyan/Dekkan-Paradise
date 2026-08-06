const express = require("express");
const Review = require("../models/Review");
const requireAdmin = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});

router.post("/", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ message: "name, rating, and comment are required" });
    }
    const ratingNum = Number(rating);
    if (ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ message: "rating must be between 1 and 5" });
    }

    const review = await Review.create({
      name,
      rating: ratingNum,
      comment,
      source: "website",
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) return res.status(404).json({ message: "Review not found" });
  res.json({ message: "Deleted" });
});

module.exports = router;
