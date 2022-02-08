'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StageSchema = new Schema({

}, { strict: false })

module.exports = mongoose.model('Stages', StageSchema)
