'use strict'
module.exports = function (app) {

  const finder = require('../controllers/finderController')

  app.route('/finder')
    .get(finder.list_all_finder_criteria)
    .post(finder.create_a_finder_criteria)

}
