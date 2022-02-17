'use strict'

const mongoose = require('mongoose')

const Configuration = mongoose.model('Configuration')

exports.updates_rate = function (req, res) {
  Configuration.findById(req.params.configurationId, function (err, configuration) {
    if (err) {
      res.send(err)
    } else {
      Configuration.findOneAndUpdate({ _id: req.params.configurationId }, req.body, { new: true }, function (err, configuration) {
        if (err) {
          res.send(err)
        } else {
          res.json(configuration)
        }
      })
    }
  })
}

exports.updates_period = function (req, res) {
  Configuration.findById(req.params.configurationId, function (err, configuration) {
    if (err) {
      res.send(err)
    } else {
      Configuration.findOneAndUpdate({ _id: req.params.configurationId }, req.body, { new: true }, function (err, configuration) {
        if (err) {
          res.send(err)
        } else {
          res.json(configuration)
        }
      })
    }
  })
}
