const express = require("express");

//controller function
const rankingController = require("../controllers/ranking.controller");

const router = express.Router();

//Create 1 new review
router.get("/readCount", rankingController.readCountSort);
router.get("/reviewCount", rankingController.reviewSort);
module.exports = router;
