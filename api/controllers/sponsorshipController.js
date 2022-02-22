'use strict'

const mongoose = require('mongoose')

const Sponsorship = mongoose.model('Sponsorship')

exports.list_all_sponsorships = function (req, res) {
  Sponsorship.find({}, function (err, sponsorship) {
    if (err) {
      res.send(err)
    } else {
      res.json(sponsorship)
    }
  })
}

exports.create_a_sponsorship = function (req, res) {
  const newSponsorship = new Sponsorship(req.body)

  newSponsorship.save(function (error, sponsorship) {
    if (error) {
      res.send(error)
    } else {
      res.json(sponsorship)
    }
  })
}

exports.read_a_sponsorship = function (req, res) {
  Sponsorship.findById(req.params.sponsorshipId, function (err, sponsorship) {
    if (err) {
      res.send(err)
    } else {
      res.json(sponsorship)
    }
  })
}

exports.update_a_sponsorship = function (req, res) {
  Sponsorship.findById(req.params.sponsorshipId, function (err, sponsorship) {
    if (err) {
      res.send(err)
    } else {
      Sponsorship.findOneAndUpdate({ _id: req.params.sponsorshipId }, req.body, { new: true }, function (err, sponsorship) {
        if (err) {
          res.send(err)
        } else {
          res.json(sponsorship)
        }
      })
    }
  })
}

exports.delete_a_sponsorship = function (req, res) {
  Sponsorship.deleteOne({
    _id: req.params.sponsorshipId
  }, function (err, sponsorship) {
    if (err) {
      res.send(err)
    } else {
      res.json({ message: 'Sponsorship successfully deleted' })
    }
  })
}

exports.pay_a_sponsorship = function (req, res) {
  res.status(200)
}

exports.list_actor_sponsorships = function (req, res) {
  Sponsorship.find({actor_id: req.params.actorId}, function (err, sponsorships) {
    if (err) {
      res.send(err)
    } else {
      res.json(sponsorships)
    }
  })
}
