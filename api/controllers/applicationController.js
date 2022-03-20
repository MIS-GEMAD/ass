"use strict";

const mongoose = require("mongoose");

const Application = mongoose.model("Application");
const Actor = mongoose.model("Actor");
const Trip = mongoose.model("Trip");

const authController = require('../controllers/authController')

exports.list_all_applications = function (req, res) {
  Application.find({}, function (err, application) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(application);
    }
  });
};

exports.create_an_application = async function (req, res) {
  
  const idToken = req.header('idToken')
  let authExplorerId = await authController.getUserId(idToken)
  let explorerId = String(authExplorerId)

  Trip.findById(req.body.trip, async function (err, trip) {
    if (err) {
      res.status(400).send(err);
    } else {

      if (!trip) {
        res.status(404).send("Trip not found");
      } else if (!trip.is_published) {
        res.status(400).send("Trip must been published");
      } else if (trip.start_date < new Date()) {
        res.status(400).send("Trip must not been started");
      } else if (trip.is_cancelled) {
        res.status(400).send("Trip must not been cancelled");
      } else {

         // check if application is unique
         Application.find(
           { trip: trip._id },
           { actor: explorerId },
           {
            $or: [
              { 'status': 'ACCEPTED' },
              { 'status': 'PENDING' }
            ]
            },
           function(err, applications) {
              if (!applications.length) {

              // set application properties
              req.body.status = "PENDING"
              req.body.actor = explorerId

              const newApplication = new Application(req.body);
              newApplication.save(function (error, application) {
                if (error) {
                  res.status(400).send(error);
                } else{

                  // updated the application trip list
                  Trip.findOneAndUpdate({ _id: req.body.trip }, {"$push": {applications: application._id}}, { new: true }, function(err, result){
                    if(err){
                      res.send(err)
                    }
                    else{

                      // updated the application explorer list
                      Actor.findOneAndUpdate({ _id: explorerId}, {"$push": {applications: application._id}}, { new: true }, function(err, result){
                        if(err){
                          res.send(err)
                        }
                        else{
                          res.status(201).json(application);
                        }
                      })

                    }
                  })

                }
              })

             }else {
              res.status(400).send('Cannot apply twice for a trip')
             }
           }
         )


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
      } else {
        res.status(400).send({ err: 'To cancel an application, must be pending or accepted' })
      }
    }
  });
};

exports.reject_an_application = function (req, res) {
  Application.findById(req.params.applicationId, function (err, application) {
    if (err) {
      res.status(404).send(err);
    } else {
      if (
        application.status === "PENDING"
      ) {
        Application.findOneAndUpdate(
          { _id: req.params.applicationId },
          { status: "REJECTED" },
          { new: true },
          function (err, application) {
            if (err) {
              res.status(400).send(err);
            } else {
              res.status(201).json(application);
            }
          }
        );
      } else {
        res.status(400).send({ err: 'To reject an application, must be pending' })
      }
    }
  });
};

exports.due_an_application = function (req, res) {
  Application.findById(req.params.applicationId, function (err, application) {
    if (err) {
      res.status(404).send(err);
    } else {
      if (
        application.status === "PENDING"
      ) {
        Application.findOneAndUpdate(
          { _id: req.params.applicationId },
          { status: "DUE" },
          { new: true },
          function (err, application) {
            if (err) {
              res.status(400).send(err);
            } else {
              res.status(201).json(application);
            }
          }
        );
      } else {
        res.status(400).send({ err: 'To due an application, must be pending' })
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
