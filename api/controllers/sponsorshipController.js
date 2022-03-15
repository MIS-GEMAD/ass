'use strict'

const mongoose = require('mongoose')

const Sponsorship = mongoose.model('Sponsorship')
const Actor = mongoose.model('Actor')

exports.list_all_sponsorships = function (req, res) {
  Actor.findById(req.params.actorId, function (err, sponsor) {
    if (err) {
      res.status(400).send(err);
    } else {
      if (!sponsor) {
        res.status(404).send("Sponsor not found");
      } else if (!sponsor.role.find((role) => role === "SPONSOR")) {
        res.status(400).send("Actor must be sponsor");
      } else {
        Sponsorship.find({actor: req.params.actorId}, function (err, sponsorship) {
          if (err) {
            res.status(400).send(err)
          } else {
            res.status(200).json(sponsorship)
          }
        })
      }
    }
  })
}

exports.create_a_sponsorship = function (req, res) {
  Actor.findById(req.params.actorId, function (err, sponsor) {
    if (err) {
      res.status(400).send(err);
    } else {
      if (!sponsor) {
        res.status(404).send("Sponsor not found");
      } else if (!sponsor.role.find((role) => role === "SPONSOR")) {
        res.status(400).send("Actor must be sponsor");
      } else {
        const newSponsorship = new Sponsorship(req.body)
        newSponsorship.save(function (error, sponsorship) {
          if (error) {
            res.status(400).send(error)
          } else {
            res.status(201).json(sponsorship)
          }
        })
      }
    }
  })
}

exports.read_a_sponsorship = function (req, res) {
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
            res.status(400).send(err)
          } else {
            res.status(200).json(sponsorship)
          }
        })
      }
    }
  })
}

exports.update_a_sponsorship = function (req, res) {
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
    }
  })
}

exports.delete_a_sponsorship = function (req, res) {
  Actor.findById(req.params.actorId, function (err, sponsor) {
    if (err) {
      res.status(400).send(err);
    } else {
      if (!sponsor) {
        res.status(404).send("Sponsor not found");
      } else if (!sponsor.role.find((role) => role === "SPONSOR")) {
        res.status(400).send("Actor must be sponsor");
      } else {
        Sponsorship.deleteOne({
          _id: req.params.sponsorshipId
        }, function (err, sponsorship) {
          if (err) {
            res.status(404).send(err)
          } else {
            res.status(204).json({ message: 'Sponsorship successfully deleted' })
          }
        })
      }
    }
  })
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
