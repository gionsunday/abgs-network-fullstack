const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Double } = require("mongodb");
require("dotenv").config();

var neString = "";
var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var string_length = 16;
var randomstring = "";
for (let i = 0; i < string_length; i++) {
  var rnum = Math.floor(Math.random() * chars.length);
  randomstring += chars.substring(rnum, rnum + 1);
  if (randomstring.length === 16) {
    neString = randomstring;
  }
}

const NewsletterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      required: [true, "please provide an name"],
      maxlength: [50, "name must not be greater than 20 characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "please provide an email"],
      maxlength: [50, "name must not be greater than 20 characters"],
    },

    digging_deep: {
      type: String,
      trim: true,
    },
    livestreams: {
      type: String,
      trim: true,
    },
    burning_q_and_a: {
      type: String,
      trim: true,
    },
    weeky_blogs: {
      type: String,
      trim: true,
    },
    special_events: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Newsletter", NewsletterSchema);
