const express = require("express");
const router = express.Router();

const { getallPrayers, createNewPrayer } = require("../controllers/prayer");

router.post("/create", createNewPrayer);
router.post("/getallprayers", getallPrayers);

module.exports = router;
