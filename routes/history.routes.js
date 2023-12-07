const express = require("express");

//controller function
const historyController = require("../controllers/history.controller");

const router = express.Router();

router.post("/", historyController.createHistory);

router.get("/:accountId", historyController.getHistory);

module.exports = router;
