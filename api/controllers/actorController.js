'use strict'

const mongoose = require('mongoose')

const Actor = mongoose.model('Actor')
const Application = mongoose.model('Application')
const admin = require('firebase-admin')
const authController = require('./authController')

exports.list_all_actors = async function(req, res) {
  try{
    const actors = await Actor.find();
    return res.status(200).json(actors);
  
  }catch(err){
    console.log(err);
  }
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
      res.status(400).send(err)
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

exports.list_explorer_applications = function (req, res) {
  const status = req.query.status.toUpperCase();
  Actor.findById({ _id: req.params.actorId }, function (err, explorer) {
    if (err) {
      res.status(400).send(err);
    } else {
      if (!explorer) {
        res.status(404).send("Explorer not found");
      } else if (!explorer.role.find((role) => role === "EXPLORER")) {
        res.status(400).send("Actor must be explorer");
      } else {
        Application.find(
          {
            _id: {
              $in: explorer.applications,
            },
            status: status,
          },
          function (err, applications) {
            if (err) {
              res.status(400).send(err);
            } else {
              res.status(200).json(applications);
            }
          }
        );
      }
    }
  });
};
exports.unban_an_actor = function (req, res) {
  Actor.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true }, function (err, actor) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(201).json(actor)
    }
  })
}

exports.update_preferred_languaje = function (req, res) {
  Actor.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true }, function (err, actor) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(201).json(actor)
    }
  })
}
