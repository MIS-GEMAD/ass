'use strict'

const mongoose = require('mongoose')

const Actor = mongoose.model('Actor')

exports.list_all_actors = function (req, res) {
  Actor.find({}, function (err, actors) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(actors)
    }
  })
}

exports.create_an_actor = function (req, res) {
  const newActor = new Actor(req.body)
  newActor.save(function (err, actor) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(201).json(actor)
    }
  })
}

exports.read_an_actor = function (req, res) {
  Actor.findById(req.params.actorId, function (err, actor) {
    if (err) {
      res.stataus(400).send(err)
    } else {
      res.status(200).json(actor)
    }
  })
}

exports.update_an_actor = function (req, res) {
  Actor.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true }, function (err, actor) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(201).json(actor)
    }
  })
}

exports.ban_an_actor = function (req, res) {
  Actor.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true }, function (err, actor) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(201).json(actor)
    }
  })
}

// exports.delete_an_actor = function (req, res) {
//   Actor.deleteOne({ _id: req.params.actorId }, function (err, actor) {
//     if (err) {
//       res.send(err)
//     } else {
//       res.json({ message: 'Actor successfully deleted' })
//     }
//   })
// }
