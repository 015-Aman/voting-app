const express = require("express");
const { verifyVoter, toggleVerification } = require("../controllers/voter.verify.controller.js");

// import { verifiedVoter } from "../controllers/voter.verifi.controller.js";


const router = express.Router();

router.get("/", verifyVoter);
router.put("/verified", toggleVerification);


module.exports = router;