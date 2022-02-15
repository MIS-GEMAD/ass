'use strict'
module.exports = function (app) {

  const finder = require('../controllers/finderController')

  app.route('/finder/results')
    .get(finder.list_all_results)
    .post(finder.create_a_result)

  app.route('/finder/results/:resultFinderId')
    .get(finder.read_a_result)
    .put(finder.update_a_result)

}
