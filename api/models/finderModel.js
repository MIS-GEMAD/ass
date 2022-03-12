"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinderSchema = new Schema(
  {
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
    trips : [{
      type: [Schema.Types.ObjectId],
      ref: 'Trip',
    }],
    actor: {
      type: Schema.Types.ObjectId,
      ref: 'Actor'
    }
  },
  { strict: true }
);

FinderSchema.index({ keyword: 'text' })

module.exports = mongoose.model("Finder", FinderSchema);
