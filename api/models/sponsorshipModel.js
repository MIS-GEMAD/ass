"use strict";
const mongoose = require("mongoose");
require('mongoose-type-url');
const Schema = mongoose.Schema;

const SponsorshipSchema = new Schema(
  {
    banner: { 
        data: Buffer, contentType: String 
    },
    link: {
        type: mongoose.SchemaTypes.Url,
    },
    trip: {
        type: [Schema.Types.ObjectId],
        ref: 'Trip',
    },
  },
  { strict: true }
);

module.exports = mongoose.model("Sponsorship", SponsorshipSchema);
