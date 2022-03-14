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

exports.login_an_actor = async function (req, res) {
  console.log('starting login an actor')
  const emailParam = req.query.email
  const password = req.query.password
  let customToken

  Actor.findOne({ email: emailParam }, function (err, actor) {
    if (err) { // No actor found with that email as username
      res.send(err)
    } else if (!actor) { // an access token isn’t provided, or is invalid
      res.status(401)
      res.json({ message: 'forbidden', error: err })
    } else if ((actor.role.includes('ADMINISTRATOR')) && (actor.validated === false)) { // an access token is valid, but requires more privileges
      res.status(403)
      res.json({ message: 'forbidden', error: err })
    } else {
      // Make sure the password is correct
      actor.verifyPassword(password, async function (err, isMatch) {
        if (err) {
          res.send(err)
        } else if (!isMatch) { // Password did not match
          res.status(401) // an access token isn’t provided, or is invalid
          res.json({ message: 'forbidden', error: err })
        } else {
          try {
            customToken = await admin.auth().createCustomToken(actor.email)
          } catch (error) {
            console.log('Error creating custom token:', error)
          }
          actor.customToken = customToken
          console.log("Login Success... sending JSON with custom token");
          res.json(actor)
        }
      })
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

exports.update_a_verified_actor = function (req, res) {
  // Customer and Clerks can update theirselves, administrators can update any actor
  console.log('Starting to update the verified actor...')
  Actor.findById(req.params.actorId, async function (err, actor) {
    if (err) {
      res.send(err)
    } else {
      console.log('actor: ' + actor)
      const idToken = req.headers.idtoken // WE NEED the FireBase custom token in the req.header... it is created by FireBase!!
      if (actor.role.includes('MANAGER') || actor.role.includes('EXPLORER') || actor.role.includes('SPONSOR')) {
        const authenticatedUserId = await authController.getUserId(idToken)

        if (authenticatedUserId == req.params.actorId) {
          Actor.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true }, function (err, actor) {
            if (err) {
              res.send(err)
            } else {
              res.json(actor)
            }
          })
        } else {
          res.status(403) // Auth error
          res.send('The Actor is trying to update an Actor that is not himself!')
        }
      } else if (actor.role.includes('ADMINISTRATOR')) {
        Actor.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true }, function (err, actor) {
          if (err) {
            res.send(err)
          } else {
            res.json(actor)
          }
        })
      } else {
        res.status(405) // Not allowed
        res.send('The Actor has unidentified roles')
      }
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
