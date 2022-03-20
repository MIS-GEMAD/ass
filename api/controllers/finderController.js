"use strict";

const mongoose = require("mongoose");

const Finder = mongoose.model("Finder");

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
      res.status(200).json(finder);
    }
  });

};
