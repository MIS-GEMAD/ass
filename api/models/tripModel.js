'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TripSchema = new Schema({

}, { strict: false })

module.exports = mongoose.model('Trips', TripSchema)
