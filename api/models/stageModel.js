"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StageSchema = new Schema(
  {
    title: {
      type: String,
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
