'use strict'
module.exports = function (app) {

  const application = require('../controllers/applicationController')

  const authController = require('../controllers/authController')

  app.route('/applications')
    .get(application.list_all_applications)
    .post(authController.verifyUser(['EXPLORER']), application.create_an_application)

  app.route('/applications/:applicationId')
    .get(application.read_an_application)
    .put(authController.verifyUser(['EXPLORER']), application.update_an_application)
    .delete(authController.verifyUser(['EXPLORER']), application.delete_an_application)

  app.route('/applications/:applicationId/cancel')
    .put(authController.verifyUser(['EXPLORER']), application.cancel_an_application)

  app.route('/applications/:applicationId/reject')
    .put(authController.verifyUser(['MANAGER']), application.reject_an_application)

  app.route('/applications/:applicationId/due')
    .put(authController.verifyUser(['MANAGER']), application.due_an_application)

}
