'use strict'

const mongoose = require('mongoose')

/* ---------------RATES---------------------- */
const Trip = mongoose.model('Trip')

exports.updates_a_rate = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.send(err)
    } else {
      Trip.findOneAndUpdate({ _id: req.params.tripId }, req.body, { new: true }, function (err, trip) {
        if (err) {
          res.send(err)
        } else {
          res.json(trip)
        }
      })
    }
  })
}
