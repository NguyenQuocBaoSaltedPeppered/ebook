const express = require("express");

//controller function
const rankingController = require("../controllers/ranking.controller");

const router = express.Router();

//Create 1 new review
router.get("/read-rank", rankingController.readCountSort);
router.get("/review-rank", rankingController.reviewSort);
module.exports = router;
