'use strict'

const mongoose = require('mongoose')

const Sponsorship = mongoose.model('Sponsorship')
const Actor = mongoose.model('Actor')

const authController = require('../controllers/authController')

exports.list_all_sponsorships = async function (req, res) {

  // get auth sponsor
  const idToken = req.header('idToken')
  let authSponsorId = await authController.getUserId(idToken)
  authSponsorId = String(authSponsorId)

  Actor.findById(authSponsorId, function (err, sponsor) {
    if (err) {
      res.status(400).send(err);
    } else{

      Sponsorship.find({actor: authSponsorId, is_paid : true}, function (err, sponsorships) {

        if(!sponsorships) {
          res.status(404).send("There are no paid sponsorships")
        } else {
          if (err) {
            res.status(400).send(err)
          } else {
            res.status(200).json(sponsorships)
          }
        }
        
      })

    }
  });

}

exports.create_a_sponsorship = async function (req, res) {

  // get auth sponsor
  const idToken = req.header('idToken')
  let authSponsorId = await authController.getUserId(idToken)
  authSponsorId = String(authSponsorId)

  Actor.findById(authSponsorId, function (err, sponsor) {
    if (err) {
      res.status(400).send(err);
    } else{
      req.body.actor = authSponsorId
      const newSponsorship = new Sponsorship(req.body)
      newSponsorship.save(function (error, sponsorship) {
        if (error) {
          res.status(400).send(error)
        } else {

          // updated the sponsor sponsorships list
          Actor.findOneAndUpdate({ _id: authSponsorId }, {"$push": {sponsorships: sponsorship._id}}, { new: true }, function(err, result){
            if(err){
              res.send(err)
            }
            else{
              res.status(201).json(sponsorship);
            }
          })

        }
      })
    }
  });

}

exports.read_a_sponsorship = async function (req, res) {

  // get auth sponsor
  const idToken = req.header('idToken')
  let authSponsorId = await authController.getUserId(idToken)
  authSponsorId = String(authSponsorId)

  Actor.findById(authSponsorId, function (err, sponsor) {
    if (err) {
      res.status(400).send(err);
    } else{
      Sponsorship.find({_id: req.params.sponsorshipId, is_paid : true}, function (err, sponsorships) {
        if (err) {
          res.status(400).send(err)
        } else {

          if(!sponsorships) {
            res.status(404).send("The sponsorship does not exist or is not paid yet")
          } else {

            if(sponsorships[0] != null) {
              if(sponsorships[0].actor == authSponsorId) {
                res.status(200).json(sponsorships[0])
              }else{
                res.status(400).send("The sponsorship does not exist or is not paid yet")
              }
            } else {
              res.status(400).send("The sponsorship does not exist or is not paid yet")
            }

            
          }


        }
      })
    }
  });

}

exports.update_a_sponsorship = async function (req, res) {

  // get auth sponsor
  const idToken = req.header('idToken')
  let authSponsorId = await authController.getUserId(idToken)
  authSponsorId = String(authSponsorId)

  Actor.findById(authSponsorId, function (err, sponsor) {
    if (err) {
      res.status(400).send(err);
    } else {

      Sponsorship.findById(req.params.sponsorshipId, function (err, sponsorship) {
        if (err) {
          res.status(404).send(err)
        } else {
          Sponsorship.findOneAndUpdate({ _id: req.params.sponsorshipId }, req.body, { new: true }, function (err, sponsorship) {
            if (err) {
              res.status(400).send(err)
            } else {
              res.status(201).json(sponsorship)
            }
          })
        }
      })

    }
  });

}

exports.delete_a_sponsorship = async function (req, res) {

  // get auth sponsor
  const idToken = req.header('idToken')
  let authSponsorId = await authController.getUserId(idToken)
  authSponsorId = String(authSponsorId)

  Actor.findById(authSponsorId, function (err, sponsor) {
    if (err) {
      res.status(400).send(err);
    } else {

      Sponsorship.deleteOne({
        _id: req.params.sponsorshipId
      }, function (err, sponsorship) {
        if (err) {
          res.status(404).send(err)
        } else {

          // updated the sponsor sponsorships list
          Actor.findOneAndUpdate({ _id: authSponsorId }, {"$pull": {sponsorships: req.params.sponsorshipId}}, { new: true }, function(err, result){
            if(err){
              res.send(err)
            }
            else{
              res.status(204).json({ message: 'Sponsorship successfully deleted' })
            }
          })
          
        }
      })

    }
  });

}

// TODO: Implementar via PayPal
exports.pay_a_sponsorship = function (req, res) {
  Actor.findById(req.params.actorId, function (err, sponsor) {
    if (err) {
      res.status(400).send(err);
    } else {
      if (!sponsor) {
        res.status(404).send("Sponsor not found");
      } else if (!sponsor.role.find((role) => role === "SPONSOR")) {
        res.status(400).send("Actor must be sponsor");
      } else {
        Sponsorship.findById(req.params.sponsorshipId, function (err, sponsorship) {
          if (err) {
            res.status(404).send("Sponsor not found")
          } else {
            if(sponsorship.is_paid === true) {
              res.status(400).send("Sponsorship is already payed");
            } else {
              Sponsorship.findOneAndUpdate({ _id: req.params.sponsorshipId }, {is_paid: true}, { new: true }, function (err, sponsorship) {
                if (err) {
                  res.status(400).send(err)
                } else {
                  res.status(201).json(sponsorship)
                }
              })
            }
          }
        })
      }
    }
  })
}
