"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createTicker = function () {
  const date = new Date();
  const ticker = `${date.getYear().toString()}${date
    .getMonth()
    .toString()}${date.getDay().toString()}-${String.fromCharCode(
    65 + Math.floor(Math.random() * 26)
  )}`;
  return ticker;
};

const TripSchema = new Schema(
  {
    ticker: {
      type: String,
      default: createTicker(),
      required: [true, 'Ticker is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    requirements: {
      type: [String],
      default: [],
      required: [true, 'Requirements are required'],
    },
    startDate: {
      type: Date,
      min: Date.now(),
      default: Date.now(),
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      min: Date.now() + 1,
      default: Date.now() + 1,
      required: [true, 'End date is required'],
    },
    pictures: {
      type: [Schema.Types.ObjectId],
      ref: 'Picture',
    },
    isCancelled: {
      type: Boolean,
      default: false,
      required: true,
    },
    cancelReason: {
      type: String,
    },
    stages: [{
      type: Schema.Types.ObjectId,
      ref: 'Stage',
    }],
    sponsorships: [{
      type: [Schema.Types.ObjectId],
      ref: 'Sponsorship',
    }],
    applications: [{
      type: [Schema.Types.ObjectId],
      ref: 'Application',
    }]
  },
  { strict: true }
);

TripSchema.index({ ticker: 'text', title: 'text', description: 'text' })

module.exports = mongoose.model("Trip", TripSchema);