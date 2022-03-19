'use strict'

const mongoose = require('mongoose')

const Trip = mongoose.model('Trip')
const Stage = mongoose.model('Stage')

exports.list_all_stages_from_trip = function (req, res) {
  
  Stage.find({ trip: req.params.tripId }, function (err, stages) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(stages)
    }
  })

}

exports.create_a_stage = function (req, res) {
  const newStage = new Stage(req.body)

  // associate stage to a trip
  newStage.trip = req.params.tripId

  newStage.save(function (error, stage) {
    if (error) {
      res.status(400).send(error)
    } else {

      console.log("intento meter en el trip " + req.params.tripId )
      console.log("el stage " +  stage._id)

      // updated the stages trip list
      Trip.findOneAndUpdate({ _id: req.params.tripId }, {"$push": {stagessss: stage._id}}, { new: true }, function(err, result){
        if(err){
          res.send(err)
        }
        else{
          res.status(201).json(stage);
        }
      })

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
