const express = require("express");
const {saveDate} = require("../controllers/election.controller.js");;

const router = express.Router();

router.post("/save", saveDate);



module.exports = router;