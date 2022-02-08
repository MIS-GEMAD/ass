'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ActorSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the actor name'
  },
  surname: {
    type: String,
    required: 'Kindly enter the actor surname'
  },
  email: {
    type: String,
    required: 'Kindly enter the actor email'
  },
  password: {
    type: String,
    minlength: 5,
    required: 'Kindly enter the actor password'
  },
  preferredLanguage: {
    type: String,
    default: 'en'
  },
  phone: {
    type: String,
    required: 'Kindly enter the phone number'
  },
  address: {
    type: String
  },
  photo: {
    data: Buffer, contentType: String
  },
  role: [{
    type: String,
    required: 'Kindly enter the user role(s)',
    enum: ['ADMINISTRATOR', 'MANAGER', 'EXPLORER']
  }],
  validated: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
}, { strict: false })

module.exports = mongoose.model('Actors', ActorSchema)
