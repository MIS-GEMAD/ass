'use strict'
module.exports = function (app) {

  const cube = require('../controllers/cubeController')

  app.route('/cube/show')
    .get(cube.show_cube)

  app.route('/cube/compute')
    .put(cube.compute_cube)

}
