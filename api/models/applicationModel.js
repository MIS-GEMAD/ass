"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema(
  {
    moment: {
      type: Date,
      max: Date.now,
      default: Date.now,
      required: [true, "Moment is required"],
    },
    status: {
      type: String,
      enum: ["PENDING", "REJECTED", "DUE", "ACCEPTED", "CANCELLED"],
      default: "PENDING",
      required: [true, "Status is required"],
    },
    trip: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: [true, "Trip is required"],
    },
  },
  { strict: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
