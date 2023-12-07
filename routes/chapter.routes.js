const express = require("express");

//controller function
const chapterController = require("../controllers/chapter.controller");

const router = express.Router();

//POST a new chapter
router.post("/", chapterController.newChapter);
//GET 1 chapter
router.get("/:chapterId", chapterController.getChapter);

module.exports = router;
