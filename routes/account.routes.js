const express = require("express");

// controller functions
const accountController = require("../controllers/account.controller");

const router = express.Router();

// login route
router.post("/login", accountController.loginAccount);

// signup route
router.post("/sign-up", accountController.signupAccount);

// detail route
router.get("/:accountId", accountController.userDetail);

// update username & email
router.patch("/:accountId/update-username-email", accountController.updateUsernameAndEmail);

// api change password
router.put("/:accountId/update-password", accountController.updatePassword);
module.exports = router;
