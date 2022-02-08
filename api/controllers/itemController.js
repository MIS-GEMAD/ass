'use strict'
const mongoose = require('mongoose')
/* ---------------ITEM---------------------- */
const Item = mongoose.model('Items')

exports.list_all_items = function (req, res) {
  Item.find({}, function (err, items) {
    if (err) {
      res.send(err)
    } else {
      res.json(items)
    }
  })
}

exports.create_an_item = function (req, res) {
  const newItem = new Item(req.body)
  newItem.save(function (err, item) {
    if (err) {
      res.send(err)
    } else {
      res.json(item)
    }
  })
}

exports.read_an_item = function (req, res) {
  Item.findById(req.params.itemId, function (err, item) {
    if (err) {
      res.send(err)
    } else {
      res.json(item)
    }
  })
}

exports.update_an_item = function (req, res) {
  Item.findOneAndUpdate({ _id: req.params.itemId }, req.body, { new: true }, function (err, item) {
    if (err) {
      res.send(err)
    } else {
      res.json(item)
    }
  })
}

exports.delete_an_item = function (req, res) {
  Item.deleteOne({ _id: req.params.itemId }, function (err, item) {
    if (err) {
      res.send(err)
    } else {
      res.json({ message: 'Item successfully deleted' })
    }
  })
}

/* ---------------CATEGORY---------------------- */
const Category = mongoose.model('Categories')

exports.list_all_categories = function (req, res) {
  Category.find({}, function (err, categs) {
    if (err) {
      res.send(err)
    } else {
      res.json(categs)
    }
  })
}

exports.create_a_category = function (req, res) {
  const newCategory = new Category(req.body)
  newCategory.save(function (err, categ) {
    if (err) {
      res.send(err)
    } else {
      res.json(categ)
    }
  })
}

exports.read_a_category = function (req, res) {
  Category.findById(req.params.categId, function (err, categ) {
    if (err) {
      res.send(err)
    } else {
      res.json(categ)
    }
  })
}

exports.update_a_category = function (req, res) {
  Category.findOneAndUpdate({ _id: req.params.categId }, req.body, { new: true }, function (err, categ) {
    if (err) {
      res.send(err)
    } else {
      res.json(categ)
    }
  })
}

exports.delete_a_category = function (req, res) {
  Category.deleteOne({ _id: req.params.categId }, function (err, categ) {
    if (err) {
      res.send(err)
    } else {
      res.json({ message: 'Category successfully deleted' })
    }
  })
}
