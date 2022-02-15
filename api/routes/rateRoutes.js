'use strict'
module.exports = function (app) {
  const rates = require('../controllers/rateController')

  app.route('/rate')
    .put(rates.creates_a_rate)

}