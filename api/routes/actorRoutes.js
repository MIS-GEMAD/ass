'use strict'
module.exports = function (app) {

  const actors = require('../controllers/actorController')

  app.route('/actors')
    .get(actors.list_all_actors)
    .post(actors.create_an_actor)

  app.route('/actors/:actorId')
    .get(actors.read_an_actor)
    .put(actors.update_an_actor)

  app.route('/actors/:actorId/ban')
    .put(actors.ban_an_actor)

  app.route('/actors/:actorId/unban')
    .put(actors.unban_an_actor)

  app.route('/actors/:actorId/languaje')
    .put(actors.update_preferred_languaje)

}
