"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DashboardSchema = new Schema(
  {
    trip_stats_by_manager: {
      
    },
    application_average: {
      type: Number
    },
    application_minimum: {
      type: Number
    },
    application_maximum: {
      type: Number
    },
    application_deviation: {
      type: Number
    },
    trip_price_stats: {
      
    },
    ratio_by_status: {
      type: Number
    },
    ratioCancelledOrders: {
      type: Number,
      max: 1,
      min: 0
    },
    computationMoment: {
      type: Date,
      default: Date.now
    },
    rebuildPeriod: {
      type: String
    }
  },
  { strict: false }
);

module.exports = mongoose.model("Dashboard", DashboardSchema);