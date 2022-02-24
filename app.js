/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");

// creación de los esquemas en MongoDB
// nota: aunque no se usen las variables, los "requires" son obligatorios
const Actor = require("./api/models/actorModel");
const Trip = require("./api/models/tripModel");
const Stage = require("./api/models/stageModel");
const Application = require("./api/models/applicationModel");
const Picture = require("./api/models/pictureModel");
const Configuration = require("./api/models/configurationModel");
const SearchCriteria = require("./api/models/searchCriteriaModel");
const Sponsorship = require("./api/models/sponsorshipModel");

// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const routesActors = require("./api/routes/actorRoutes");
const routesTrips = require("./api/routes/tripRoutes");
const routesApplications = require("./api/routes/applicationRoutes");

routesActors(app);
routesTrips(app);
routesApplications(app);

// MongoDB URI building
const mongoDBHostname = process.env.mongoDBHostname || "mongodb";
const mongoDBPort = process.env.mongoDBPort || "27017";
const mongoDBName = process.env.mongoDBName || "ACME_Explorer";
const mongoDBURI =
  "mongodb://" + mongoDBHostname + ":" + mongoDBPort + "/" + mongoDBName;

mongoose.connect(mongoDBURI);
console.log("Connecting DB to: " + mongoDBURI);

mongoose.connection.on("open", function () {
  app.listen(port, function () {
    console.log("ACME-Explorer RESTful API server started on: " + port);
  });
});

mongoose.connection.on("error", function (err) {
  console.error("DB init error " + err);
});

var axios = require("axios");
const fs = require("fs");
const config = {
  headers: { Authorization: "Bearer t96m1j7j72b9k902fh6nbq1mge634l4hwhu3s4mr" },
};
const TripModel = mongoose.model("Trip");
const ApplicationModel = mongoose.model("Application");
const SearchCriteriaModel = mongoose.model("SearchCriteria");
const SponsorshipModel = mongoose.model("Sponsorship");

var endpoints = [
  "https://api.json-generator.com/templates/6tuHvyOtMLfh/data",
  "https://api.json-generator.com/templates/TFQ2qYCKJkPV/data",
  "https://api.json-generator.com/templates/_HFONodi_Cpz/data",
  "https://api.json-generator.com/templates/TFPXWI4zbtT7/data",
  "https://api.json-generator.com/templates/Jn1G-nuNWLSO/data",
  "https://api.json-generator.com/templates/nqA1326hTa7q/data",
  "https://api.json-generator.com/templates/NCs_HiAJENP1/data",
  "https://api.json-generator.com/templates/OE-7oiCaxV0F/data",
];

axios
  .all(endpoints.map((endpoint) => axios.get(endpoint, config)))
  .then((data) => {
    const trips = data[0].data;
    const actors = data[1].data;
    const applications = data[2].data;
    const stages = data[3].data;
    const configurations = data[4].data;
    const searchCriterias = data[5].data;
    const pictures = data[6].data;
    const sponsorships = data[7].data;

    Picture.create(pictures, function (err, pictures) {
      if (err) {
        console.log("Error while populating pictures: " + err);
      } else {
        console.log("Pictures populated!");
        Actor.create(actors, function (err, actors) {
          if (err) {
            console.log("Error while populating actors: " + err);
          } else {
            console.log("Actors populated!");
            const managers = actors.filter((actor) =>
              actor.role.includes("MANAGER")
            );
            const explorers = actors.filter((actor) =>
              actor.role.includes("EXPLORER")
            );
            for (let i = 0; i < searchCriterias.length; i++) {
              searchCriterias[i].explorer =
                explorers[
                  Math.floor(Math.random() * (explorers.length - 1))
                ]._id.valueOf();
              const newSearchCriteria = new SearchCriteriaModel(
                searchCriterias[i]
              );
              newSearchCriteria.save(function (err, searchCriteria) {
                if (err) {
                  console.log("Error while populating searchCriterias: " + err);
                } else {
                  searchCriterias[i] = searchCriteria;
                }
                if (!err && i === searchCriterias.length - 1) {
                  console.log("Search criterias populated!");
                }
              });
            }
            for (let i = 0; i < trips.length; i++) {
              trips[i].manager =
                managers[
                  Math.floor(Math.random() * (managers.length - 1))
                ]._id.valueOf();
              trips[i].picture =
                pictures[
                  Math.floor(Math.random() * (pictures.length - 1))
                ]._id.valueOf();
              const newTrip = new TripModel(trips[i]);
              newTrip.save(function (err, trip) {
                if (err) {
                  console.log("Error while populating trips: " + err);
                } else {
                  trips[i] = trip;
                }
                if (!err && i === trips.length - 1) {
                  for (let j = 0; j < applications.length; j++) {
                    applications[j].trip =
                      trips[
                        Math.floor(Math.random() * (trips.length - 1))
                      ]._id.valueOf();
                    const newApplication = new ApplicationModel(
                      applications[j]
                    );
                    newApplication.save(function (err, application) {
                      if (err) {
                        console.log(
                          "Error while populating applications: " + err
                        );
                      } else {
                        applications[i] = application;
                      }
                      if (!err && j === applications.length - 1) {
                        console.log("Applications populated!");
                      }
                    });
                  }
                  for (let j = 0; j < sponsorships.length; j++) {
                    sponsorships[j].trip =
                      trips[
                        Math.floor(Math.random() * (trips.length - 1))
                      ]._id.valueOf();
                    const newSponsorship = new SponsorshipModel(
                      sponsorships[j]
                    );
                    newSponsorship.save(function (err, sponsorship) {
                      if (err) {
                        console.log(
                          "Error while populating sponsorships: " + err
                        );
                      } else {
                        sponsorships[i] = sponsorship;
                      }
                      if (!err && j === sponsorships.length - 1) {
                        console.log("Sponsorships populated!");
                      }
                    });
                  }
                  console.log("Trips populated!");
                }
              });
            }
          }
        });
      }
    });

    Stage.create(stages, function (err, stages) {
      if (err) {
        console.log("Error while populating stages: " + err);
      } else {
        console.log("Stages populated!");
      }
    });
    Configuration.create(configurations, function (err, configurations) {
      if (err) {
        console.log("Error while populating configurations: " + err);
      } else {
        console.log("Configurations populated!");
      }
    });
  });
