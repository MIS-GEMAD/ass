"use strict";

const mongoose = require("mongoose");

const Trip = mongoose.model("Trip");
const Application = mongoose.model("Application");
const Actor = mongoose.model("Actor");
const Sponsorship = mongoose.model("Sponsorship");

const authController = require('./authController')

exports.list_all_trips = function (req, res) {
  Trip.find({}, function (err, trip) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(trip);
    }
  });
};

exports.create_a_trip = async function (req, res) {
  const newTrip = new Trip(req.body)
  

  // associate manager to trip
  const idToken = req.header('idToken')
  const managerId = await authController.getUserId(idToken)
  newTrip.manager = managerId

  newTrip.save(function (err, trip) {
    if (err) {
      res.status(400).send(err);
    } else {

      // associate trip to trip list from manager
      console.log("idddddd " + trip._id)
      Actor.findById(managerId, function (err, manager) {
        manager.trips.push(trip._id)
        console.log("manager trips: " + manager.trips)
      })

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
      if( !trip.is_published ) {
        Trip.findOneAndUpdate({ _id: req.params.tripId }, req.body, { new: true }, function (err, trip) {
            if (err) {
              res.status(400).send(err);
            } else {
              res.status(201).json(trip);
            }
          }
        );
      } else {
        res.status(400).send({ err: 'Cannot update a published trip' });
      }
    }
  })
};

exports.delete_a_trip = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.status(404).send(err);
    } else {
      if( !trip.is_published ) {
        Trip.deleteOne({ _id: req.params.tripId }, function (err, trip) {
            if (err) {
              res.status(400).send(err);
            } else {
              res.status(204).json({ message: "Trip successfully deleted" });
            }
          }
        );
      } else {
        res.status(400).send({ err: 'Cannot delete a published trip' });
      }
    }
  });
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
  Trip.find({ actor: req.params.actorId }, function (err, trips) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(trips);
    }
  });
};

exports.cancel_a_trip = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.status(404).send(err)
    } else {
      Application.find({ trip: req.params.tripId, status: 'ACCEPTED' }, function (err, applications) {
        if (err) {
          res.status(404).send(err)
        } else {
          if (
            trip.is_published &&
            Date.now() < trip.start_date &&
            applications.length == 0
          ) {
            Trip.findOneAndUpdate(
              { _id: req.params.tripId },
              { status: "CANCELLED", is_cancelled: true },
              { new: true },
              function (err, trip) {
                if (err) {
                  res.status(400).send(err)
                } else {
                  res.status(201).json(trip)
                }
              }
            )
          } else {
            res.status(400).send({ err: 'The trip are not published, have started or have accepted applications'})
          }
        }    
      })
    }
  })
};

exports.select_random_banner = function (req, res) {
  Trip.findById(req.params.tripId, function (err, trip) {
    if (err) {
      res.status(400).send(err);
    } else {
      if (!trip) {
        res.status(404).send("Trip not found");
      } else {
        Sponsorship.find({trip: trip._id.toString(), $set: { is_paid: true }}, function (err, sponsorships) {
          console.log(err,sponsorships)
          if (err) {
            res.status(400).send(err);
          } else {
            if (!sponsorships) {
              res.status(404).send("Sponsorships not found");
            } else {
              var random = Math.floor(Math.random() * sponsorships.length)

              res.status(200).json(sponsorships[random]);
            }
          }
        })
      }
    }
  });
};
