const express = require("express");
const { fetchSubAdmin, loginAdmin, logoutAdmin, registerSubAdmin, verifyVoter, publishResult, changePassword, verifyCandidate } = require("../controllers/admin.auth.controller.js");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/registersubadmin", registerSubAdmin);
router.get("/subadmin", fetchSubAdmin);
router.post("/verifyvoter", verifyVoter);
router.post("/changepassword",changePassword);
router.post("/verifycandidate",verifyCandidate);
router.post("/publish", publishResult);

module.exports = router;
