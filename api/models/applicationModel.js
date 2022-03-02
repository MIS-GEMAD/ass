"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema(
  {
    moment: {
      type: Date,
      max: Date.now(),
      default: Date.now(),
      required: 'Kindly enter the moment'
    },
    status: {
      type: String,
      enum: ["PENDING", "REJECTED", "DUE", "ACCEPTED", "CANCELLED"],
      default: "PENDING",
      required: 'Kindly enter the status'
    },
    comments: {
      type: [String],
      default: []
    }
  },
  { strict: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
