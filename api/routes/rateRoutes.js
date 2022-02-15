'use strict'
module.exports = function (app) {
  const rates = require('../controllers/rateController')

  app.route('/rate')
    .put(rates.updates_a_rate)

}