'use strict'
module.exports = function (app) {

  const application = require('../controllers/applicationController')

  const authController = require('../controllers/authController')

  app.route('/applications')
    .get(application.list_all_applications)
    .post(authController.verifyUser(['EXPLORER']), application.create_an_application)

  app.route('/applications/owns')
    .get(authController.verifyUser(['EXPLORER']), application.list_applications_from_auth_explorer)

  app.route('/applications/:applicationId')
    .get(application.read_an_application)

  app.route('/applications/:applicationId/pay')
    .get(application.pay_a_trip)

  app.route('/applications/:applicationId/cancel')
    .put(authController.verifyUser(['EXPLORER']), application.cancel_an_application)

  app.route('/applications/:applicationId/reject')
    .put(authController.verifyUser(['EXPLORER']), application.reject_an_application)

  app.route('/applications/:applicationId/due')
    .put(authController.verifyUser(['EXPLORER']), application.due_an_application)

}
