const express = require("express");
const { registerVoter, loginVoter, logoutVoter, changePassword, getCandidates, getVoters } = require("../controllers/voter.auth.controller.js");

const router = express.Router();

router.post("/register", registerVoter);
router.post("/login", loginVoter);
router.post("/logout", logoutVoter);
router.post("/changepassword", changePassword);
router.get("/candidates", getCandidates);
router.get("/voters", getVoters);


module.exports = router;