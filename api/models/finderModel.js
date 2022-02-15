"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinderSchema = new Schema(
  {
    explorer: {
      type: Schema.Types.ObjectId,
      ref: "Actor",
      required: [true, "Explorer is required"],
    },
  },
  { strict: true }
);

module.exports = mongoose.model("Finder", FinderSchema);