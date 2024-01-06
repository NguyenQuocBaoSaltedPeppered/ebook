const express = require("express");

//controller function
const novelController = require("../controllers/novel.controller");

const router = express.Router();

router.get("/", novelController.getLatest);

router.get("/:novelId", novelController.get1Novel);

router.get("/novelOfUser/:accountId", novelController.getNovelsOfUser);

//Create 1 new novel
router.post("/", novelController.newNovel);

//novel same types
router.post("/types", novelController.sameTypes);

router.post("/search", novelController.searchNovel);

module.exports = router;
