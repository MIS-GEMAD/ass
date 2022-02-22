'use strict'
module.exports = function (app) {

  const application = require('../controllers/applicationController')

  app.route('/applications')
    .get(application.list_all_applications)
    .post(application.create_an_application)

  app.route('/applications/:applicationId')
    .get(application.read_an_application)
    .put(application.update_an_application)
    .delete(application.delete_an_application)

  app.route('/applications/:applicationId/cancel')
    .put(application.cancel_an_application)

  app.route('/applications/:actorId')
    .get(application.list_actor_applications)

  app.route('/applications/:tripId')
    .get(application.list_trip_applications)

}
