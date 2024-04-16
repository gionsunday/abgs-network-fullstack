const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Double } = require("mongodb");
require("dotenv").config();

const PrayerSchema = new mongoose.Schema(
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

    prayer: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Prayer", PrayerSchema);
