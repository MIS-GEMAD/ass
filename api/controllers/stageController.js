'use strict'

const mongoose = require('mongoose')

const Stage = mongoose.model('Stage')

exports.list_all_stages = function (req, res) {
  Stage.find({}, function (err, stage) {
    if (err) {
      res.send(err)
    } else {
      res.json(stage)
    }
  })
}

exports.create_a_stage = function (req, res) {
  const newStage = new Stage(req.body)

  newStage.save(function (error, stage) {
    if (error) {
      res.send(error)
    } else {
      res.json(stage)
    }
  })
}

exports.read_a_stage = function (req, res) {
  Stage.findById(req.params.stageId, function (err, stage) {
    if (err) {
      res.send(err)
    } else {
      res.json(stage)
    }
  })
}

exports.update_a_stage = function (req, res) {
  Stage.findById(req.params.stageId, function (err, stage) {
    if (err) {
      res.send(err)
    } else {
      Stage.findOneAndUpdate({ _id: req.params.stageId }, req.body, { new: true }, function (err, stage) {
        if (err) {
          res.send(err)
        } else {
          res.json(stage)
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
      res.send(err)
    } else {
      res.json({ message: 'Stage successfully deleted' })
    }
  })
}
