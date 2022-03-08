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
      required: 'Kindly enter the ticker',
      unique: true
    },
    title: {
      type: String,
      required: 'Kindly enter the title'
    },
    description: {
      type: String,
      required: 'Kindly enter the description'
    },
    price: {
      type: Number,
      default: 0
    },
    requirements: {
      type: [String],
      default: [],
      required: 'Kindly enter the requirements'
    },
    start_date: {
      type: Date,
      min: Date.now(),
      default: Date.now(),
      required: 'Kindly enter the start date'
    },
    end_date: {
      type: Date,
      min: Date.now() + 1,
      default: Date.now() + 1,
      required: 'Kindly enter the end date',
    },
    pictures: {
      type: [Schema.Types.ObjectId],
      ref: 'Picture',
    },
    is_cancelled: {
      type: Boolean,
      default: false
    },
    cancel_reason: {
      type: String,
    },
    is_published: {
      type: Boolean,
      default: false
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