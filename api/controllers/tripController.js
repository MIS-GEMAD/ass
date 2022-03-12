"use strict";

const mongoose = require("mongoose");

const Trip = mongoose.model("Trip");
const Application = mongoose.model("Application");
const Actor = mongoose.model("Actor");

exports.list_all_trips = function (req, res) {
  Trip.find({}, function (err, trip) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(trip);
    }
  });
};

exports.create_a_trip = function (req, res) {
  const newTrip = new Trip(req.body);

  newTrip.save(function (error, trip) {
    if (error) {
      res.status(400).send(error);
    } else {
      res.status(201).json(trip);
    }
  });
};

exports.read_a_trip = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(trip);
    }
  });
};

exports.update_a_trip = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.status(404).send(err);
    } else {
      Trip.findOneAndUpdate(
        { _id: req.params.tripId },
        req.body,
        { new: true },
        function (err, trip) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(201).json(trip);
          }
        }
      );
    }
  });
};

exports.delete_a_trip = function (req, res) {
  Trip.deleteOne(
    {
      _id: req.params.tripId,
    },
    function (err, trip) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).json({ message: "Trip successfully deleted" });
      }
    }
  );
};

// TODO: Implementar via PayPal
exports.pay_a_trip = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {

    if (err) {
      res.status(404).send(err);
    } else {
      if (!trip) {
        res.status(404).send("Trip not found");
      } else {
        Actor.findById(req.params.actorId, function (err, actor) {
          if (err) {
            res.status(400).send(err);
          } else {
            if (!actor) {
              res.status(404).send("Actor not found");
            } else if (!actor.role.find((role) => role === "EXPLORER")) {
              res.status(400).send("Actor must be explorer");
            } else {
              if (
                trip.applications.length > 0 &&
                actor.applications.length > 0
              ) {
                var applicationId = "";
                var exist = false;
                if (!trip) {
                  res.status(400).send("Trip must be applied");
                } else {
                  for (let i = 0; i < trip.applications.length; i++) {
                    for (let j = 0; j < actor.applications.length; j++) {
                      if (trip.applications[i].toString() == actor.applications[j].toString()) {
                        exist = true;
                        applicationId = trip.applications[i].toString();
                        break;
                      }
                    }
                  }

                  if (!exist) {
                    res.status(400).send("Application not found");
                  } else {
                    Application.findById(
                      applicationId,
                      function (err, application) {
                        if (err) {
                          res.status(400).send(err);
                        } else {
                          if (!application) {
                            res.status(400).send("Application not found");
                          } else {
                            if (application.status !== "DUE") {
                              res.status(400).send("Trip is not due");
                            } else {
                              Application.findOneAndUpdate(
                                { _id: applicationId },
                                { status: "ACCEPTED" },
                                { new: true },
                                function (err, application) {
                                  if (err) {
                                    res.status(400).send(err);
                                  } else {
                                    res.status(201).json(application);
                                  }
                                }
                              );
                            }
                          }
                        }
                      }
                    );
                  }
                }
              } else {
                res.status(400).send("Application not found");
              }
            }
          }
        });
      }
    }
  });
};

exports.list_actor_trips = function (req, res) {
  Trip.find({ actor_id: req.params.actorId }, function (err, trips) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(trips);
    }
  });
};
