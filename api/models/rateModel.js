"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RateSchema = new Schema(
  {
    flat_rate: { 
      type: Number
    }
  },
  { strict: true }
);

module.exports = mongoose.model("Rate", RateSchema);
