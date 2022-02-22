'use strict'
module.exports = function (app) {

  const configuration = require('../controllers/configurationController')

  app.route('/rate')
    .put(configuration.updates_rate)

  app.route('/period')
    .put(configuration.updates_period)

  app.route('/finder/result')
    .put(configuration.updates_finder_result)

}