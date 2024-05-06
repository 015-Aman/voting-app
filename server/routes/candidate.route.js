const express = require("express");
const router = express.Router();
const { getCandidates } = require("../controllers/candidate.controller");

// Route to fetch candidates
router.get("/", getCandidates);

module.exports = router;
