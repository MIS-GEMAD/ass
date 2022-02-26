'use strict'

const mongoose = require('mongoose')

const Application = mongoose.model('Application')

exports.list_all_applications = function (req, res) {
  Application.find({}, function (err, application) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(application)
    }
  })
}

exports.create_an_application = function (req, res) {
  const newTrip = new Application(req.body)

  newTrip.save(function (error, application) {
    if (error) {
      res.status(400).send(error)
    } else {
      res.status(201).json(application)
    }
  })
}

exports.read_an_application = function (req, res) {
  Application.findById(req.params.applicationId, function (err, application) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(201).json(application)
    }
  })
}

exports.update_an_application = function (req, res) {
  Application.findById(req.params.applicationId, function (err, application) {
    if (err) {
      res.status(404).send(err)
    } else {
      Application.findOneAndUpdate({ _id: req.params.applicationId }, req.body, { new: true }, function (err, application) {
        if (err) {
          res.status(400).send(err)
        } else {
          res.status(201).json(application)
        }
      })
    }
  })
}

exports.delete_an_application = function (req, res) {
  Application.deleteOne({
    _id: req.params.applicationId
  }, function (err, application) {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(204).json({ message: 'Application successfully deleted' })
    }
  })
}

exports.cancel_an_application = function (req, res) {
  res.status(200)
}

exports.list_actor_applications = function (req, res) {
  Application.find({actor_id: req.params.actorId}, function (err, applications) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(applications)
    }
  })
}

exports.list_trip_applications = function (req, res) {
  Application.find({trip_id: req.params.tripId}, function (err, applications) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(applications)
    }
  })
}
