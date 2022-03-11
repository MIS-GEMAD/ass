'use strict'

const async = require('async')
const mongoose = require('mongoose')
const Dashboard = mongoose.model('Dashboard')
const Trip = mongoose.model('Trip')

exports.list_all_indicators = function (req, res) {
  console.log('Requesting indicators')

  Dashboard.find().sort('-computationMoment').exec(function (err, indicators) {
  if (err) {
    res.send(err)
  } else {
    res.json(indicators)
  }
  })
}

exports.last_indicator = function (req, res) {
  Dashboard.find().sort('-computationMoment').limit(1).exec(function (err, indicators) {
    if (err) {
      res.send(err)
    } else {
      res.json(indicators)
    }
  })
}

const CronJob = require('cron').CronJob
const CronTime = require('cron').CronTime

// '0 0 * * * *' una hora
// '*/30 * * * * *' cada 30 segundos
// '*/10 * * * * *' cada 10 segundos
// '* * * * * *' cada segundo
let rebuildPeriod = '*/10 * * * * *' // El que se usará por defecto
let computeDashboardJob

exports.rebuildPeriod = function (req, res) {
  res.status(200)
  console.log('Updating rebuild period. Request: period:' + req.query.rebuildPeriod)
  
  // Get Rebuild Period
  rebuildPeriod = req.query.rebuildPeriod
  if(rebuildPeriod == null){
    res.status(400).send('Error: Missing query parameter \'?rebuildPeriod=*/10 * * * * *\' in URI');
  }
    
  // Compute
  computeDashboardJob.setTime(new CronTime(rebuildPeriod))
  computeDashboardJob.start()

  res.json(req.query.rebuildPeriod)
  
}

function createDashboardJob () {
  computeDashboardJob = new CronJob(rebuildPeriod, function () {
    const newDashboard = new Dashboard()
    console.log('Cron job submitted. Rebuild period: ' + rebuildPeriod)
    async.parallel([

      computeTrips
      
    ], function (err, results) {
      if (err) {
        console.log('Error computing datawarehouse: ' + err)
      } else {

        newDashboard.trip_stats = results[0]
        newDashboard.rebuildPeriod = rebuildPeriod

        newDashboard.save(function (err, dashboard) {
          if (err) {
            console.log('Error saving dashboard: ' + err)
          } else {
            console.log('new Dashboard succesfully saved. Date: ' + new Date())
          }
        })

      }
    })
  }, null, true, 'Europe/Madrid')
}

module.exports.createDashboardJob = createDashboardJob

function computeTrips (callback) {

  Trip.aggregate([
    { 
      $match: { 
        cancelationMoment: { 
          $exists: true 
        } 
      } 
    },
    { 
      $project: {
        _id: 0,
        avgPrice: 1,
        minPrice: 1,
        maxPrice: 1,
        stdPrice: 1
      } 
    }
  ], function (err, res) {
    callback(err, res)
  })
};



// function computeTopCancellers (callback) {
//   Orders.aggregate([
//     { $match: { cancelationMoment: { $exists: true } } },
//     {
//       $facet: {
//         preComputation: [
//           { $group: { _id: '$consumer', ordersCanceled: { $sum: 1 } } },
//           { $group: { _id: null, nCanceladores: { $sum: 1 } } },
//           { $project: { _id: 0, limitTopPercentage: { $ceil: { $multiply: ['$nCanceladores', 0.1] } } } }
//         ],
//         canceladores: [{ $project: { _id: 0, consumer: 1 } }, { $group: { _id: '$consumer', ordersCanceled: { $sum: 1 } } }, { $sort: { ordersCanceled: -1 } }]
//       }
//     },
//     { $project: { topCanceladores: { $slice: ['$canceladores', { $arrayElemAt: ['$preComputation.limitTopPercentage', 0] }] } } }
//   ], function (err, res) {
//     callback(err, res[0].topCanceladores)
//   })
// };

// function computeTopNotCancellers (callback) {
//   Orders.aggregate([
//     { $match: { cancelationMoment: { $exists: false } } },
//     {
//       $facet: {
//         preComputation: [
//           { $group: { _id: '$consumer', ordersNotCanceled: { $sum: 1 } } },
//           { $group: { _id: null, nNoCanceladores: { $sum: 1 } } },
//           { $project: { _id: 0, limitTopPercentage: { $ceil: { $multiply: ['$nNoCanceladores', 0.1] } } } }
//         ],
//         noCanceladores: [{ $project: { _id: 0, consumer: 1 } }, { $group: { _id: '$consumer', ordersNotCanceled: { $sum: 1 } } }, { $sort: { ordersNotCanceled: -1 } }]
//       }
//     },
//     { $project: { topNoCanceladores: { $slice: ['$noCanceladores', { $arrayElemAt: ['$preComputation.limitTopPercentage', 0] }] } } }
//   ], function (err, res) {
//     callback(err, res[0].topNoCanceladores)
//   })
// };

// function computeBottomNotCancellers (callback) {
//   Orders.aggregate([
//     { $match: { cancelationMoment: { $exists: false } } },
//     {
//       $facet: {
//         preComputation: [
//           { $group: { _id: '$consumer', ordersNotCanceled: { $sum: 1 } } },
//           { $group: { _id: null, nNoCanceladores: { $sum: 1 } } },
//           { $project: { _id: 0, limitTopPercentage: { $ceil: { $multiply: ['$nNoCanceladores', 0.1] } } } }
//         ],
//         noCanceladores: [{ $project: { _id: 0, consumer: 1 } }, { $group: { _id: '$consumer', ordersNotCanceled: { $sum: 1 } } }, { $sort: { ordersNotCanceled: 1 } }]
//       }
//     },
//     { $project: { bottomNoCanceladores: { $slice: ['$noCanceladores', { $arrayElemAt: ['$preComputation.limitTopPercentage', 0] }] } } }
//   ], function (err, res) {
//     callback(err, res[0].bottomNoCanceladores)
//   })
// };

// function computeTopClerks (callback) {
//   Orders.aggregate([
//     { $match: { deliveryMoment: { $exists: true } } },
//     {
//       $facet: {
//         preComputation: [
//           { $group: { _id: '$clerk', ordersDelivered: { $sum: 1 } } },
//           { $group: { _id: null, nDeliverers: { $sum: 1 } } },
//           { $project: { _id: 0, limitTopPercentage: { $ceil: { $multiply: ['$nDeliverers', 0.1] } } } }
//         ],
//         deliverers: [{ $project: { _id: 0, clerk: 1 } }, { $group: { _id: '$clerk', ordersDelivered: { $sum: 1 } } }, { $sort: { ordersDelivered: -1 } }]
//       }
//     },
//     { $project: { topDeliverers: { $slice: ['$deliverers', { $arrayElemAt: ['$preComputation.limitTopPercentage', 0] }] } } }
//   ], function (err, res) {
//     callback(err, res[0].topDeliverers)
//   })
// };

// function computeBottomClerks (callback) {
//   Orders.aggregate([
//     { $match: { deliveryMoment: { $exists: true } } },
//     {
//       $facet: {
//         preComputation: [
//           { $group: { _id: '$clerk', ordersDelivered: { $sum: 1 } } },
//           { $group: { _id: null, nDeliverers: { $sum: 1 } } },
//           { $project: { _id: 0, limitTopPercentage: { $ceil: { $multiply: ['$nDeliverers', 0.1] } } } }
//         ],
//         deliverers: [{ $project: { _id: 0, clerk: 1 } }, { $group: { _id: '$clerk', ordersDelivered: { $sum: 1 } } }, { $sort: { ordersDelivered: 1 } }]
//       }
//     },
//     { $project: { bottomDeliverers: { $slice: ['$deliverers', { $arrayElemAt: ['$preComputation.limitTopPercentage', 0] }] } } }
//   ], function (err, res) {
//     callback(err, res[0].bottomDeliverers)
//   })
// };

// function computeRatioCancelledOrders (callback) {
//   Orders.aggregate([
//     {
//       $project: {
//         placementMonth: { $month: '$placementMoment' },
//         placementYear: { $year: '$placementMoment' },
//         cancelationMoment: 1
//       }
//     },
//     {
//       $match: {
//         placementMonth: new Date().getMonth() + 1,
//         placementYear: new Date().getFullYear()
//       }
//     },
//     {
//       $facet: {
//         totalOrdersCurrentMonth: [{ $group: { _id: null, totalOrders: { $sum: 1 } } }],
//         totalCancelledOrdersCurrentMonth: [
//           { $match: { cancelationMoment: { $exists: true } } },
//           { $group: { _id: null, totalOrders: { $sum: 1 } } }]
//       }
//     },

//     { $project: { _id: 0, ratioOrdersCancelledCurrentMont: { $divide: [{ $arrayElemAt: ['$totalCancelledOrdersCurrentMonth.totalOrders', 0] }, { $arrayElemAt: ['$totalOrdersCurrentMonth.totalOrders', 0] }] } } }
//   ], function (err, res) {
//     if (res?.length > 0) {
//       callback(err, res[0]?.ratioOrdersCancelledCurrentMont)
//     } else {
//       callback(err, res)
//     }
//   })
// };
