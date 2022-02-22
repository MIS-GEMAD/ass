'use strict'
module.exports = function (app) {

  const trip = require('../controllers/tripController')

  const stage = require('../controllers/stageController')

  app.route('/trips')
    .get(trip.list_all_trips)
    .post(trip.create_a_trip)

  app.route('/trips/:tripId')
    .get(trip.read_a_trip)
    .put(trip.update_a_trip)
    .delete(trip.delete_a_trip)

  app.route('/trips/:tripId/pay')
    .put(trip.pay_a_trip)

  app.route('/trips/:tripId/stages')
    .get(stage.list_all_stages)
    .post(stage.create_a_stage)

  app.route('/trips/:tripId/stages/:stageId')
    .get(stage.read_a_stage)
    .put(stage.update_a_stage)
    .delete(stage.delete_a_stage)

  app.route('/trips/:actorId')
    .get(actors.list_actor_trips)

}
