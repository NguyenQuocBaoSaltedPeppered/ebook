const express = require("express");

// controller functions
const accountController = require("../controllers/account.controller");

const router = express.Router();

// login route
router.post("/login", accountController.loginAccount);

// signup route
router.post("/sign-up", accountController.signupAccount);

// update username & email
router.patch("/update-username-email", accountController.updateUsernameAndEmail);

// api change password

module.exports = router;
