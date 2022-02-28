'use strict'
module.exports = function (app) {

  const search = require('../controllers/searchController')

  app.route('/search')
    .get(search.list_all_search_criteria)
    .post(search.create_a_search_criteria)

}
