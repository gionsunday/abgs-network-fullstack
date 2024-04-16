const express = require("express");
const router = express.Router();

const {
  getallNews,

  createNewsletter,
} = require("../controllers/newletter");

router.post("/create", createNewsletter);
router.post("/getallNews", getallNews);
// router.post('/getoneemail', getOnenemail)
// router.post('/deleteoneemail', deleteOnenemail)
// router.post('/general/update', generalUpdate )

module.exports = router;
