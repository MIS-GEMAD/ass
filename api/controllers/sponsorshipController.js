'use strict'

const mongoose = require('mongoose')

const Sponsorship = mongoose.model('Sponsorship')

exports.list_all_sponsorships = function (req, res) {
  Sponsorship.find({}, function (err, sponsorship) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(sponsorship)
    }
  })
}

exports.create_a_sponsorship = function (req, res) {
  const newSponsorship = new Sponsorship(req.body)

  newSponsorship.save(function (error, sponsorship) {
    if (error) {
      res.status(400).send(error)
    } else {
      res.status(201).json(sponsorship)
    }
  })
}

exports.read_a_sponsorship = function (req, res) {
  Sponsorship.findById(req.params.sponsorshipId, function (err, sponsorship) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(sponsorship)
    }
  })
}

exports.update_a_sponsorship = function (req, res) {
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

exports.delete_a_sponsorship = function (req, res) {
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

exports.pay_a_sponsorship = function (req, res) {
  res.status(200)
}

exports.list_actor_sponsorships = function (req, res) {
  Sponsorship.find({actor_id: req.params.actorId}, function (err, sponsorships) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(sponsorships)
    }
  })
}
