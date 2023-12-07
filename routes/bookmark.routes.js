const express = require("express");

//controller function
const bookmarkController = require("../controllers/bookmark.controller");

const router = express.Router();

//POST a new bookmark
router.post("/", bookmarkController.newBookmark);

//POST to get bookmark for a account
router.get("/:accountId", bookmarkController.getBookmark);

//DELETE bookmark
router.delete("/:accountID/:novelID", bookmarkController.deleteBookmark);

//GET Bookmark Status
router.get("/:accountId/:novelId", bookmarkController.bookmarkStatus);

module.exports = router;
