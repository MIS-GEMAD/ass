"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StageSchema = new Schema(
  {
    title: {
      type: String,
      required: 'Kindly enter the title',
    },
    description: {
      type: String,
      required: 'Kindly enter the description',
    },
    price: {
      type: Number,
      min: 0,
      required: 'Kindly enter the price',
    },
  },
  { strict: true }
);

module.exports = mongoose.model("Stage", StageSchema);
