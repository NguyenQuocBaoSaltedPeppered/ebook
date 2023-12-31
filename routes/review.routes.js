const express = require("express");

//controller function
const reviewController = require("../controllers/review.controller");

const router = express.Router();

//Create 1 new review
router.post("/", reviewController.newReview);

router.get("/:novelId", reviewController.getReviewOfANovel);

module.exports = router;
