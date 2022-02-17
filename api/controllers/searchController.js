'use strict'

const mongoose = require('mongoose')

const SearchCriteria = mongoose.model('SearchCriteria')

// TODO: Tiene que devolver los resultados del finder del Explorer logeado
exports.list_all_search_criteria = function (req, res) {
  SearchCriteria.find({}, function (err, searchCriteria) {
    if (err) {
      res.send(err)
    } else {
      res.json(searchCriteria)
    }
  })
}

exports.create_a_search_criteria = function (req, res) {
  const newSearchCriteria = new SearchCriteria(req.body)

  newSearchCriteria.save(function (error, searchCriteria) {
    if (error) {
      res.send(error)
    } else {
      res.json(searchCriteria)
    }
  })
}
