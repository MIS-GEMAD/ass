/* eslint-disable no-unused-vars */
const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const mongoose = require('mongoose')
const Actor = require('./api/models/actorModel')
const Application = require('./api/models/applicationModel')
const Picture = require('./api/models/pictureModel')
const Stage = require('./api/models/stageModel')
const Trip = require('./api/models/tripModel')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const routesActors = require('./api/routes/actorRoutes')
const routesItems = require('./api/routes/itemRoutes')
const routesOrders = require('./api/routes/orderRoutes')

routesActors(app)
routesItems(app)
routesOrders(app)

// MongoDB URI building
const mongoDBHostname = process.env.mongoDBHostname || 'mongodb'
const mongoDBPort = process.env.mongoDBPort || '27017'
const mongoDBName = process.env.mongoDBName || 'ACME_Explorer'
const mongoDBURI = 'mongodb://' + mongoDBHostname + ':' + mongoDBPort + '/' + mongoDBName

mongoose.connect(mongoDBURI)
console.log('Connecting DB to: ' + mongoDBURI)

mongoose.connection.on('open', function () {
  app.listen(port, function () {
    console.log('ACME-Explorer RESTful API server started on: ' + port)
  })
})

mongoose.connection.on('error', function (err) {
  console.error('DB init error ' + err)
})
