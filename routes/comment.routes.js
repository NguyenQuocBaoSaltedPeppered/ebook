const express = require("express");

//controller function
const commentController = require("../controllers/comment.controller");

const router = express.Router();

router.post("/", commentController.newComment);

router.get("/:novelId", commentController.commentOfANovel);

module.exports = router;
