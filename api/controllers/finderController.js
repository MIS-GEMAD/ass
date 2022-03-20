"use strict";

const mongoose = require("mongoose");

const Finder = mongoose.model("Finder");
const Trip = mongoose.model("Trip");

exports.create_a_finder_criteria = function (req, res) {
  Actor.findById(req.body.actor, function (err, explorer) {
    if (err) {
      res.status(400).send(err);
    } else {
      if (!explorer) {
        res.status(404).send("Explorer not found");
      } else if (!explorer.role.find((role) => role === "EXPLORER")) {
        res.status(400).send("Actor must be explorer");
      } else {
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
      }
    }
  });
};
