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

exports.pay_a_trip = function (req, res) {
  res.status(200)
}

exports.list_actor_trips = function (req, res) {
  Trip.find({actor_id: req.params.actorId}, function (err, trips) {
    if (err) {
      res.send(err)
    } else {
      res.json(trips)
    }
  })
}
