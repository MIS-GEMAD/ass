"use strict";

const mongoose = require("mongoose");

const Application = mongoose.model("Application");
const Actor = mongoose.model("Actor");
const Trip = mongoose.model("Trip");

exports.list_all_applications = function (req, res) {
  Application.find({}, function (err, application) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(application);
    }
  });
};

exports.create_an_application = function (req, res) {
  const reqPpal = req.body;

  Actor.findById(req.body.explorer, function (err, explorer) {
    if (err) {
      res.status(400).send(err);
    } else {
      if (!explorer) {
        res.status(404).send("Explorer not found");
      } else if (!explorer.role.find((role) => role === "EXPLORER")) {
        res.status(400).send("Actor must be explorer");
      } else {
        Trip.findById(req.body.trip, function (err, trip) {
          if (err) {
            res.status(400).send(err);
          } else {
            if (!trip) {
              res.status(404).send("Trip not found");
            } else if (!trip.is_published) {
              res.status(400).send("Trip must been published");
            } else if (trip.start_date > new Date()) {
              res.status(400).send("Trip must not been started");
            } else if (trip.is_cancelled) {
              res.status(400).send("Trip must not been cancelled");
            } else {
              var unique = true;
              if(trip.applications && explorer.applications) {
                for (let i = 0; i < trip.applications.length; i++) {
                  for (let j = 0; j < explorer.applications.length; j++) {
                    if(trip.applications[i] === explorer.applications[j]) {
                      unique = false;
                      break;
                    }
                  }
                }
              }

              if(!unique) {
                res.status(400).send('Cannot apply twice for a trip')
              } else {
                req.body.status = "PENDING";
                const newApplication = new Application(req.body);
                newApplication.save(function (error, application) {
                  if (error) {
                    res.status(400).send(error);
                  } else {
                    explorer['applications']=application._id.toString()
                    Actor.findOneAndUpdate(
                      { _id: reqPpal.explorer },
                      explorer,
                      { new: true },
                      function (err, actor) {
                        if (err) {
                          res.status(400).send(err);
                        } else {
                          trip['applications']=application._id.toString()
                          Trip.findOneAndUpdate(
                            { _id: reqPpal.trip },
                            trip,
                            { new: true },
                            function (err, trip) {
                              if (err) {
                                res.status(400).send(err);
                              } else {
                                res.status(201).json(application);
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                });
              }
            }
          }
        });
      }
    }
  });
};

exports.read_an_application = function (req, res) {
  Application.findById(req.params.applicationId, function (err, application) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(application);
    }
  });
};

exports.update_an_application = function (req, res) {
  Application.findById(req.params.applicationId, function (err, application) {
    if (err) {
      res.status(404).send(err);
    } else {
      Application.findOneAndUpdate(
        { _id: req.params.applicationId },
        req.body,
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
  });
};

exports.delete_an_application = function (req, res) {
  Application.deleteOne(
    {
      _id: req.params.applicationId,
    },
    function (err, application) {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(204).json({ message: "Application successfully deleted" });
      }
    }
  );
};

exports.cancel_an_application = function (req, res) {
  Application.findById(req.params.applicationId, function (err, application) {
    if (err) {
      res.status(404).send(err);
    } else {
      if (
        application.status === "PENDING" ||
        application.status === "ACCEPTED"
      ) {
        Application.findOneAndUpdate(
          { _id: req.params.applicationId },
          { status: "CANCELLED" },
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
  });
};

exports.list_trip_applications = function (req, res) {
  Application.find(
    { trip: req.params.tripId },
    function (err, applications) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(applications);
      }
    }
  );
};
