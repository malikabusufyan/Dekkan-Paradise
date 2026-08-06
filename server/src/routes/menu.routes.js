const express = require("express");
const MenuItem = require("../models/MenuItem");
const { MENU_CATEGORIES } = require("../models/categories");
const requireAdmin = require("../middleware/auth");
const { imageUpload } = require("../middleware/upload");
const { uploadBuffer, deleteByUrl } = require("../services/storage");

const router = express.Router();

router.get("/categories", (req, res) => {
  res.json(MENU_CATEGORIES);
});

router.get("/", async (req, res) => {
  const items = await MenuItem.find().sort({ category: 1, name: 1 });
  res.json(items);
});

router.post("/", requireAdmin, imageUpload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category, isAvailable } = req.body;
    if (!name || price === undefined || !category) {
      return res.status(400).json({ message: "name, price, and category are required" });
    }

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadBuffer({
        buffer: req.file.buffer,
        folder: "menu",
        originalName: req.file.originalname,
        contentType: req.file.mimetype,
      });
    }

    const item = await MenuItem.create({
      name,
      description,
      price: Number(price),
      category,
      isAvailable: isAvailable === undefined ? true : isAvailable === "true" || isAvailable === true,
      imageUrl,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", requireAdmin, imageUpload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category, isAvailable } = req.body;
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Menu item not found" });

    if (name !== undefined) item.name = name;
    if (description !== undefined) item.description = description;
    if (price !== undefined) item.price = Number(price);
    if (category !== undefined) item.category = category;
    if (isAvailable !== undefined) item.isAvailable = isAvailable === "true" || isAvailable === true;

    if (req.file) {
      const oldImageUrl = item.imageUrl;
      item.imageUrl = await uploadBuffer({
        buffer: req.file.buffer,
        folder: "menu",
        originalName: req.file.originalname,
        contentType: req.file.mimetype,
      });
      if (oldImageUrl) await deleteByUrl(oldImageUrl);
    }

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  const item = await MenuItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Menu item not found" });

  if (item.imageUrl) await deleteByUrl(item.imageUrl);

  res.json({ message: "Deleted" });
});

module.exports = router;
