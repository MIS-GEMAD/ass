'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApplicationSchema = new Schema({

}, { strict: false })

module.exports = mongoose.model('Applications', ApplicationSchema)
