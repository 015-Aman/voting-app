const express = require("express");
const { verifyCandidate } = require("../controllers/candidate.verify.controller.js");

const router = express.Router();

router.get("/", verifyCandidate);


module.exports = router;