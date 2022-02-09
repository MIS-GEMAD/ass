"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createTicker = function () {
  const ticker = `${Date.now.getYear().toString()}${Date.now
    .getMonth()
    .toString()}${Date.now.getDay().toString()}${String.fromCharCode(
    65 + Math.floor(Math.random() * 26)
  )}`;
  return ticker;
};

const StageSchema = new Schema(
  {
    title: {
      type: String,
      default: createTicker(),
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
  },
  { strict: true }
);

module.exports = mongoose.model("Stage", StageSchema);
