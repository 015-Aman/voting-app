const express = require("express");
const { registerCandidate, loginCandidate, logoutCandidate } = require("../controllers/candidate.auth.controller.js");

const router = express.Router();

router.post("/register", registerCandidate);
router.post("/login", loginCandidate);
router.post("/logout", logoutCandidate);

module.exports = router;