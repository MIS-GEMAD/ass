'use strict'

const mongoose = require('mongoose')

/* ---------------Finder---------------------- */
const Finder = mongoose.model('Finder')
const ResultFinder = mongoose.model('ResultFinder')

// TODO: Tiene que devolver los resultados del finder del Explorer logeado
exports.list_all_results = function (req, res) {
  Finder.find({}, function (err, trip) {
    if (err) {
      res.send(err)
    } else {
      res.json(trip)
    }
  })
}

exports.create_a_result = function (req, res) {
  const newResult = new ResultFinder(req.body)

  newResult.save(function (error, result) {
    if (error) {
      res.send(error)
    } else {
      res.json(result)
    }
  })
}

exports.read_a_result = function (req, res) {
  Result.findById(req.params.resultFinderId, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.json(result)
    }
  })
}

exports.update_a_result = function (req, res) {
  Result.findById(req.params.resultFinderId, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      Trip.findOneAndUpdate({ _id: req.params.resultFinderId }, req.body, { new: true }, function (err, result) {
        if (err) {
          res.send(err)
        } else {
          res.json(result)
        }
      })
    }
  })
}
