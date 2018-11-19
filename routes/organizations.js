const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth'); //Incude 'ensureAuthenticated' in get/set method call to prevent unauthorized access

module.exports = router;

// Load Inventory Model
require('../models/Event');
const Event = mongoose.model('events');

// Load Idea Model
require('../models/User');
const User = mongoose.model('users');

// Organization Route
router.get('/list', (req, res) => {
  User.find()
    .sort({
      name: 'asc'
    })
    .then(users => {
      res.render('enlist/organizations', {
        users: users
      });
    });
});
