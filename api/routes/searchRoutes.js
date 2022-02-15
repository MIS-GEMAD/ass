'use strict'
module.exports = function (app) {

  const search = require('../controllers/searchController')

  app.route('/search')
    .get(search.list_all_search_criteria)
    .post(search.create_a_search_criteria)

  app.route('/search/:searchCriteriaId')
    .get(search.read_a_search_criteria)
    .put(search.update_a_search_criteria)

}
