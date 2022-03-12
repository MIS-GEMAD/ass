'use strict'

exports.store_json_fs = function (req, res) {
  const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB
  const JSONStream = require('JSONStream')
  const fs = require('fs')
  const ObjectID = require('mongodb').ObjectID;

  let dbURL = null
  let collection = null
  let sourceFile = null
  let batchSize = null
  let parseString = null
  let response = ''

  if (req.query.dbURL && req.query.collection && req.query.sourceFile) {
    dbURL = req.query.dbURL
    collection = req.query.collection
    sourceFile = req.query.sourceFile
    if (req.query.batchSize) batchSize = req.query.batchSize; else batchSize = 1000
    if (req.query.parseString) parseString = req.query.parseString; else parseString = '*'
  
    // where the data will end up
    const outputDBConfig = { dbURL: dbURL, collection: collection, batchSize: batchSize }
  
    // create the writable stream
    const writableStream = streamToMongoDB(outputDBConfig)
  
    // create readable stream and consume it
    console.log('starting streaming the json from file: ' + sourceFile + ', to dbURL: ' + dbURL + ', into the collection: ' + collection)
    fs.createReadStream(sourceFile) // './myJsonData.json'
      .pipe(JSONStream.parse(parseString))
      .on('data', function handleRecord(data) {
          data._id = ObjectID(data._id)

          if (collection == 'actors') {
            let sponsorship = ''
            let application = ''
            let trip = ''
            let finder = ''

            let new_sponsorships = []
            let new_applications = []
            let new_trips = []
            let new_finders = []

            if (data.sponsorships){
              for (sponsorship of data.sponsorships){
                sponsorship = ObjectID(sponsorship)
                new_sponsorships.push(sponsorship)
              }

              data.sponsorships = new_sponsorships
            }

            if (data.applications){
              for (application of data.applications){
                application = ObjectID(application)
                new_applications.push(application)
              }

              data.applications = new_applications
            }

            if (data.trips){
              for (trip of data.trips){
                trip = ObjectID(trip)
                new_trips.push(trip)
              }

              data.trips = new_trips
            }

            if (data.finders){
              for (finder of data.finders){
                finder = ObjectID(finder)
                new_finders.push(finder)
              }

              data.finders = new_finders
            }
          }

          if (collection == 'trips') {
            let stage = ''
            let application = ''
            let sponsorship = ''
            let picture = ''

            let new_sponsorships = []
            let new_applications = []
            let new_stages = []
            let new_pictures = []

            if (data.stages){
              for (stage of data.stages){
                stage = ObjectID(stage)
                new_stages.push(stage)
              }

              data.stages = new_stages
            }

            if (data.applications){
              for (application of data.applications){
                application = ObjectID(application)
                new_applications.push(application)
              }

              data.applications = new_applications
            }

            if (data.sponsorships){
              for (sponsorship of data.sponsorships){
                sponsorship = ObjectID(sponsorship)
                new_sponsorships.push(sponsorship)
              }

              data.sponsorships = new_sponsorships
            }

            if (data.pictures){
              for (picture of data.pictures){
                picture = ObjectID(picture)
                new_pictures.push(picture)
              }

              data.pictures = new_pictures
            }

            data.manager = ObjectID(data.manager)
          }

          if (collection == 'stages') {
            data.trip = ObjectID(data.trip)
          }

          if (collection == 'applications') {
            data.trip = ObjectID(data.trip)
            data.actor = ObjectID(data.actor)
          }

          if (collection == 'sponsorships') {
            data.trip = ObjectID(data.trip)
            data.actor = ObjectID(data.actor)
          }

          if (collection == 'finders') {
            data.actor = ObjectID(data.actor)
          }

          if (collection == 'pictures') {
            data.trip = ObjectID(data.trip)
          }

				}
			)
      .pipe(writableStream)
      .on('finish', function () {
        response += 'All documents stored in the collection!'
        console.log(response)
        res.send(response)
      })
      .on('error', function (err) {
        console.log(err)
        res.send(err)
      })
  } else {
    if (req.query.dbURL == null) response += 'A mandatory dbURL parameter is missed.\n'
    if (req.query.collection == null) response += 'A mandatory collection parameter is missed.\n'
    if (req.query.sourceFile == null) response += 'A mandatory sourceFile parameter is missed.\n'
    console.log(response)
    res.send(response)
  }
}