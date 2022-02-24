"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PictureSchema = new Schema(
  {
    picture: {
      // data: Buffer, contentType: String
      type: String,
      required: [true, 'Picture is required'],
    },
  },
  { strict: true }
);

module.exports = mongoose.model("Picture", PictureSchema);
