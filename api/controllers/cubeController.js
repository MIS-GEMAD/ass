'use strict'

const async = require('async')
const mongoose = require('mongoose')
const Cube = mongoose.model('Cube')
const Trip = mongoose.model('Trip')
const Actor = mongoose.model('Actor')
const Application = mongoose.model('Application')
const Finder = mongoose.model('Finder')

exports.show_cube = function (req, res) {
  Cube.find({}, function (err, cubes) {
    if (err) {
      res.send(err)
    } else {
      res.json(cubes[0])
    }
  })
}

exports.compute_cube = function (req, res) {
  Cube.find({}, function (err, cubes) {
    const cube = cubes[0]
    const actor_id = mongoose.Types.ObjectId(req.body.actor)
    const date_from = new Date(req.body.date_from)
    const date_to = new Date(req.body.date_to)

    let totalPrice = 0

    function money_in_period (actor_id) {
      Trip.aggregate([
        {
          $lookup: {
            from: 'applications',
            localField: 'applications',
            foreignField: '_id',
            as: 'applications'
          }
        },
        {
          $match: {
            'applications.actor': actor_id,
            'applications.status': 'ACCEPTED',
            'applications.moment': {
              $gte: date_from,
              $lt: date_to
            }
          }
        },
        {
          $group: {
            _id: null,
            sum: { $sum: '$price' }
          }
        },
      ], 
      function (err, res) {
        console.log(res)
        totalPrice = res
      }
      );
    }

    money_in_period(actor_id)

    console.log(totalPrice)

    function compute_cube () {
      
    }

    compute_cube()
  })
}
