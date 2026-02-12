const express = require("express");

const siteController = require("../controllers/siteController");

const router = express.Router();

router.get("/", siteController.home);
router.get("/about", siteController.about);
router.get("/exhibitions", siteController.exhibitions);
router.get("/contact", siteController.contact);
router.post("/contact", siteController.contactSubmit);
router.get("/map", siteController.map);

module.exports = router;

