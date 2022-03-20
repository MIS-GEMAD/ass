'use strict'
module.exports = function (app) {

  const actors = require('../controllers/actorController')
  const authController = require('../controllers/authController')

  app.route('/actors')
    .get(actors.list_all_actors)
    .post(authController.verifyUser(['EXPLORER', 'SPONSOR']), actors.create_an_actor)

  app.route('/actors/manager')
    .post(authController.verifyUser(['ADMINISTRATOR']), actors.create_a_manager)

  app.route('/actors/:actorId')
    .get(actors.read_an_actor)
    .put(authController.verifyUser(['ADMINISTRATOR',
                                    'MANAGER',
                                    'EXPLORER',
                                    'SPONSOR']), actors.update_a_verified_actor)

  app.route('/actors/:actorId/ban')
    .put(authController.verifyUser(['ADMINISTRATOR']), actors.ban_an_actor)

  app.route('/actors/:actorId/applications')
    .get(actors.list_explorer_applications)

  app.route('/actors/:actorId/unban')
    .put(authController.verifyUser(['ADMINISTRATOR']), actors.unban_an_actor)

  app.route('/actors/:actorId/languaje')
    .put(actors.update_preferred_languaje)

}
