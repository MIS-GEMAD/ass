'use strict'
module.exports = function (app) {

  const finder = require('../controllers/finderController')

  app.route('/finder')
    .post(finder.create_a_finder_criteria)

}
