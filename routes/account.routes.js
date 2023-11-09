const express = require("express");

// controller functions
const accountController = require("../controllers/account.controller");

const router = express.Router();

// login route
router.post("/login", accountController.loginAccount);

// signup route
router.post("/sign-up", accountController.signupAccount);

module.exports = router;
