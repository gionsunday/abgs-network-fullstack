const express = require("express");
const router = express.Router();

const { getallMessages, createNewMessage } = require("../controllers/message");

router.post("/create", createNewMessage);
router.post("/getallmessage", getallMessages);

module.exports = router;
