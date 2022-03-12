'use strict'

const mongoose = require('mongoose')

const Trip = mongoose.model('Trip')

exports.list_all_trips = function (req, res) {
  Trip.find({}, function (err, trip) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(trip)
    }
  })
}

exports.create_a_trip = function (req, res) {
  const newTrip = new Trip(req.body)
  newTrip.save(function (err, trip) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(201).json(trip)
    }
  })
}

exports.read_a_trip = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(trip)
    }
  })
}

exports.update_a_trip = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.status(404).send(err)
    } else {
      Trip.findOneAndUpdate({ _id: req.params.tripId }, req.body, { new: true }, function (err, trip) {
        if (err) {
          res.status(400).send(err)
        } else {
          res.status(201).json(trip)
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
      res.status(400).send(err)
    } else {
      res.status(204).json({ message: 'Trip successfully deleted' })
    }
  })
}

// TODO: Implementar via PayPal
exports.pay_a_trip = function (req, res) {
  res.status(200)
}

exports.list_actor_trips = function (req, res) {
  Trip.find({actor_id: req.params.actorId}, function (err, trips) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(trips)
    }
  })
}
