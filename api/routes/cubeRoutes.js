'use strict'
module.exports = function (app) {

  const cube = require('../controllers/cubeController')

  app.route('/cube/:period')
    .get(cube.get_explorers)

    app.route('/cube/:period/:explorerId')
    .get(cube.get_amount)

}
