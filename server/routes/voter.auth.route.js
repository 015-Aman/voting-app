const express = require("express");
const { registerVoter, loginVoter, logoutVoter, changePassword } = require("../controllers/voter.auth.controller.js");

const router = express.Router();

router.post("/register", registerVoter);
router.post("/login", loginVoter);
router.post("/logout", logoutVoter);
router.post("/changepassword", changePassword);


module.exports = router;