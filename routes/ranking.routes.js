const express = require("express");

//controller function
const rankingController = require("../controllers/ranking.controller");

const router = express.Router();

// Xếp hạng theo lượt đọc
router.get("/read-rank", rankingController.readCountSort);
// Xếp hạng theo lượt Review
router.get("/review-rank", rankingController.reviewSort);

router.get("/score-rank",rankingController.scoreSort);

module.exports = router;
