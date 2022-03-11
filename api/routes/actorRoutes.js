'use strict'
module.exports = function (app) {

  const actors = require('../controllers/actorController')

  // TODO: Crear endpoint para cambiar el preferred languaje
  // TODO: Crear endpoint para cambiar el estado de baneado a desbaneado

  app.route('/actors')
    .get(actors.list_all_actors)
    .post(actors.create_an_actor)

  app.route('/actors/:actorId')
    .get(actors.read_an_actor)
    .put(actors.update_an_actor)

  app.route('/actors/:actorId/ban')
    .put(actors.ban_an_actor)

    app.route('/actors/:actorId/applications')
    .get(actors.list_explorer_applications)

}
