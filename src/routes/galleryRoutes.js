const express = require("express");

const galleryController = require("../controllers/galleryController");

const router = express.Router();

router.get("/gallery", galleryController.galleryIndex);
router.get("/gallery/:slug", galleryController.galleryDetail);

module.exports = router;

