// Launch a process to compute a cube of the form M[e, p] that returns the amount of
// money that explorer e has spent on trips during period p, which can be M01-M36 to
// denote any of the last 1-36 months or Y01-Y03 to denote any of the last three years. 3. Consult the cube by means of the following queries:
// a. Given e and p, return M[e, p].
// b. Given p, return the explorers e such that M[e, p] q v, where v denotes an ar-
// bitrary amount of money and q is a comparison operator (that is, “equal”, “not equal”, “greater than”, “greater than or equal”, 
// “smaller than”, or “smaller than or equal”).
"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CubeSchema = new Schema(
  {
    money_in_period: {
      
    }
  },
  { strict: false }
);

module.exports = mongoose.model("Cube", CubeSchema);
