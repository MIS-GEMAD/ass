'use strict'
module.exports = function (app) {

  const finder = require('../controllers/finderController')

  const authController = require('../controllers/authController')

  app.route('/finder')
    .post(authController.verifyUser(['EXPLORER']), finder.create_a_finder_criteria)

}
