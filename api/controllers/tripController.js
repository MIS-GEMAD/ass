'use strict'

const mongoose = require('mongoose')

const Trip = mongoose.model('Trip')

exports.list_all_trips = function (req, res) {
  Trip.find({}, function (err, trip) {
    if (err) {
      res.send(err)
    } else {
      res.json(trip)
    }
  })
}

exports.list_my_trips = function (req, res) {
  Trip.find({}, function (err, orders) {
    if (err) {
      res.send(err)
    } else {
      res.json(orders)
    }
  })
}

exports.create_a_trip = function (req, res) {
  const newTrip = new Trip(req.body)

  newTrip.save(function (error, trip) {
    if (error) {
      res.send(error)
    } else {
      res.json(trip)
    }
  })
}

exports.read_a_trip = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.send(err)
    } else {
      res.json(trip)
    }
  })
}

exports.update_a_trip = function (req, res) {
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

exports.pay_a_trip = function (req, res) {
  res.status(200)
}

exports.delete_a_trip = function (req, res) {
  Trip.deleteOne({
    _id: req.params.tripId
  }, function (err, trip) {
    if (err) {
      res.send(err)
    } else {
      res.json({ message: 'Trip successfully deleted' })
    }
  })
}
