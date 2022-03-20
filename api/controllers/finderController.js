"use strict";

const mongoose = require("mongoose");

const Finder = mongoose.model("Finder");
const Trip = mongoose.model("Trip");
const Actor = mongoose.model("Actor");

const authController = require('../controllers/authController')

exports.create_a_finder_criteria = async function (req, res) {

  // get auth explorer
  const idToken = req.header('idToken')
  let authExplorerId = await authController.getUserId(idToken)
  authExplorerId = String(authExplorerId)

  // add explorer to finder
  req.body.actor = authExplorerId
  const newFinder = new Finder(req.body);

  newFinder.save(function (error, finder) {
    if (error) {
      res.status(400).send(error);
    } else {
      Trip.find(
        {
          ticker: { $regex: req.body.keyword, $options: "i" },
          title: { $regex: req.body.keyword, $options: "i" },
          description: { $regex: req.body.keyword, $options: "i" },
          price: { $lte: req.body.price_to, $gte: req.body.price_from },
          start_date: {
            $gte: req.body.date_from,
          },
          end_date: {
            $lt: req.body.date_to,
          },
        },
        function (err, trips) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).json(finder);
          }
        }
      );
    }
  });

};
