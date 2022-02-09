'use strict'

const mongoose = require('mongoose')

/* ---------------APPLICATIONS---------------------- */
const Application = mongoose.model('Applications')

exports.list_all_applications = function (req, res) {
  Application.find({}, function (err, application) {
    if (err) {
      res.send(err)
    } else {
      res.json(application)
    }
  })
}

exports.create_an_application = function (req, res) {
  const newTrip = new Application(req.body)

  newTrip.save(function (error, application) {
    if (error) {
      res.send(error)
    } else {
      res.json(application)
    }
  })
}

exports.read_an_application = function (req, res) {
  Application.findById(req.params.applicationId, function (err, application) {
    if (err) {
      res.send(err)
    } else {
      res.json(application)
    }
  })
}

exports.update_an_application = function (req, res) {
  Application.findById(req.params.applicationId, function (err, application) {
    if (err) {
      res.send(err)
    } else {
      Application.findOneAndUpdate({ _id: req.params.applicationId }, req.body, { new: true }, function (err, application) {
        if (err) {
          res.send(err)
        } else {
          res.json(application)
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
      res.send(err)
    } else {
      res.json({ message: 'Application successfully deleted' })
    }
  })
}
