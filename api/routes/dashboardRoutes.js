'use strict'
module.exports = function (app) {
  
  const dashboard = require('../controllers/dashboardController')

  app.route('/dashboard')
    .get(dashboard.list_all_indicators)
    .post(dashboard.rebuildPeriod)

  app.route('/dashboard/latest')
    .get(dashboard.last_indicator)

}
