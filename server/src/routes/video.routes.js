const express = require("express");
const Video = require("../models/Video");
const requireAdmin = require("../middleware/auth");
const { videoUpload } = require("../middleware/upload");
const { uploadBuffer, deleteByUrl } = require("../services/storage");

const router = express.Router();

const EMBEDDABLE_HOSTS = ["facebook.com", "www.facebook.com", "fb.watch"];

function isEmbeddableUrl(value) {
  try {
    const { hostname, protocol } = new URL(value);
    return protocol === "https:" && EMBEDDABLE_HOSTS.includes(hostname);
  } catch {
    return false;
  }
}

router.get("/", async (req, res) => {
  const videos = await Video.find().sort({ createdAt: -1 });
  res.json(videos);
});

router.post("/", requireAdmin, videoUpload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "A video file is required" });
    }
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }

    const videoPath = await uploadBuffer({
      buffer: req.file.buffer,
      folder: "videos",
      originalName: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const video = await Video.create({
      title,
      description: description || "",
      sourceType: "upload",
      videoPath,
    });

    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/embed", requireAdmin, async (req, res) => {
  try {
    const { title, description, embedUrl } = req.body;
    if (!title || !embedUrl) {
      return res.status(400).json({ message: "title and embedUrl are required" });
    }
    if (!isEmbeddableUrl(embedUrl)) {
      return res.status(400).json({ message: "embedUrl must be a facebook.com or fb.watch link" });
    }

    const video = await Video.create({
      title,
      description: description || "",
      sourceType: "embed",
      embedUrl,
    });

    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  const video = await Video.findByIdAndDelete(req.params.id);
  if (!video) return res.status(404).json({ message: "Video not found" });

  if (video.sourceType === "upload" && video.videoPath) {
    await deleteByUrl(video.videoPath);
  }

  res.json({ message: "Deleted" });
});

module.exports = router;
