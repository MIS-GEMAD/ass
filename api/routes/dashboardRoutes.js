'use strict'
module.exports = function (app) {
  
    const dashboard = require('../controllers/dashboardController')

    app.route('/dashboard/trips/average')
      .get(dashboard.get_trip_average)

    app.route('/dashboard/trips/minimum')
      .get(dashboard.get_trip_minimum)

    app.route('/dashboard/trips/maximum')
      .get(dashboard.get_trip_maximum)

    app.route('/dashboard/trips/deviation')
      .get(dashboard.get_trip_deviation)

    app.route('/dashboard/applications/average')
      .get(dashboard.get_application_average)

    app.route('/dashboard/applications/minimum')
      .get(dashboard.get_application_minimum)

    app.route('/dashboard/applications/maximum')
      .get(dashboard.get_application_maximum)

    app.route('/dashboard/applications/deviation')
      .get(dashboard.get_application_deviation)

    app.route('/dashboard/trips/price/average')
      .get(dashboard.get_trip_price_average)

    app.route('/dashboard/trips/price/minimum')
      .get(dashboard.get_trip_price_minimum)

    app.route('/dashboard/trips/price/maximum')
      .get(dashboard.get_trip_price_maximum)

    app.route('/dashboard/trips/price/deviation')
      .get(dashboard.get_trip_price_deviation)

    app.route('/dashboard/applications/status')
      .get(dashboard.get_ratio_by_status)

}
