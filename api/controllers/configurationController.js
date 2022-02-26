'use strict'

const mongoose = require('mongoose')

const Configuration = mongoose.model('Configuration')

exports.updates_rate = function (req, res) {
  Configuration.findById(req.params.configurationId, function (err, configuration) {
    if (err) {
      res.status(404).send(err)
    } else {
      Configuration.findOneAndUpdate({ _id: req.params.configurationId }, req.body, { new: true }, function (err, configuration) {
        if (err) {
          res.status(400).send(err)
        } else {
          res.status(201).json(configuration)
        }
      })
    }
  })
}

exports.updates_period = function (req, res) {
  Configuration.findById(req.params.configurationId, function (err, configuration) {
    if (err) {
      res.status(404).send(err)
    } else {
      Configuration.findOneAndUpdate({ _id: req.params.configurationId }, req.body, { new: true }, function (err, configuration) {
        if (err) {
          res.status(400).send(err)
        } else {
          res.status(201).json(configuration)
        }
      })
    }
  })
}

exports.updates_finder_result = function (req, res) {
  Configuration.findById(req.params.configurationId, function (err, configuration) {
    if (err) {
      res.status(404).send(err)
    } else {
      Configuration.findOneAndUpdate({ _id: req.params.configurationId }, req.body, { new: true }, function (err, configuration) {
        if (err) {
          res.status(400).send(err)
        } else {
          res.status(201).json(configuration)
        }
      })
    }
  })
}
