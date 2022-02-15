"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const ActorSchema = new Schema(
  {
    role: {
      type: String,
      enum : ['ADMINISTRATOR','MANAGER', 'EXPLORER'],
      default: 'EXPLORER',
      required: [true, "Role is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
    },
    email: {
      type: String,
      validate: [validateEmail, "Please provide a valid email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    trips: [{
      type: [Schema.Types.ObjectId],
      ref: 'Trip',
    }],
    applications: [{
      type: [Schema.Types.ObjectId],
      ref: 'Application',
    }],
    ban: {
      type: Boolean
    }
  },
  { strict: true }
);

module.exports = mongoose.model("Actor", ActorSchema);
