'use strict'

const mongoose = require('mongoose')

const Stage = mongoose.model('Stage')

exports.list_all_stages = function (req, res) {
  Stage.find({}, function (err, stage) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(stage)
    }
  })
}

// TODO: Calcular el precio del trip como propiedad derivada y actualizarlo
exports.create_a_stage = function (req, res) {
  const newStage = new Stage(req.body)

  newStage.save(function (error, stage) {
    if (error) {
      res.status(400).send(error)
    } else {
      res.status(201).json(stage)
    }
  })
}

exports.read_a_stage = function (req, res) {
  Stage.findById(req.params.stageId, function (err, stage) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(stage)
    }
  })
}

exports.update_a_stage = function (req, res) {
  Stage.findById(req.params.stageId, function (err, stage) {
    if (err) {
      res.status(404).send(err)
    } else {
      Stage.findOneAndUpdate({ _id: req.params.stageId }, req.body, { new: true }, function (err, stage) {
        if (err) {
          res.status(400).send(err)
        } else {
          res.status(201).json(stage)
        }
      })
    }
  })
}

exports.delete_a_stage = function (req, res) {
  Stage.deleteOne({
    _id: req.params.stageId
  }, function (err, stage) {
    if (err) {
      res.status(404).send(err)
    } else {
      res.status(204).json({ message: 'Stage successfully deleted' })
    }
  })
}
