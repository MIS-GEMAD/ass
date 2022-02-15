"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultFinderSchema = new Schema(
  {
    explorer: {
      type: Schema.Types.ObjectId,
      ref: "Finder",
      required: [true, "Finder is required"],
    },
    keyword: {
      type: String
    },
    price_from: {
      type: Number
    },
    price_to: {
      type: Number
    },
    date_from : {
      type: Date
    },
    date_to : {
      type: Date
    },
    trips: [{
      type: [Schema.Types.ObjectId],
      ref: 'Trip',
    }],
  },
  { strict: true }
);

module.exports = mongoose.model("ResultFinder", ResultFinderSchema);