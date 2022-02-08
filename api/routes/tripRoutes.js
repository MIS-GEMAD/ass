'use strict'
module.exports = function (app) {
  const trip = require('../controllers/tripController')

  app.route('/trips')
    .get(trip.list_all_trips)
    .post(trip.create_a_trip)

  app.route('/trips/:tripId')
    .get(trip.read_a_trip)
    .put(trip.update_a_trip)
    .delete(trip.delete_a_trip)

  // TODO: Añadir las stages del trip y sus rutas asociadas
}
