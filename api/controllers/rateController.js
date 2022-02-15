'use strict'

const mongoose = require('mongoose')

/* ---------------RATES---------------------- */
const Rate = mongoose.model('Rate')

exports.updates_a_rate = function (req, res) {
  Rate.findById(req.params.rateId, function (err, rate) {
    if (err) {
      res.send(err)
    } else {
      Rate.findOneAndUpdate({ _id: req.params.rateId }, req.body, { new: true }, function (err, rate) {
        if (err) {
          res.send(err)
        } else {
          res.json(rate)
        }
      })
    }
  })
}
