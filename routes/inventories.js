const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth'); //Incude 'ensureAuthenticated' in get/set method call to prevent unauthorized access


module.exports = router;

// Load Inventory Model
require('../models/Inventory');
const Inventory = mongoose.model('inventories');

// Inventory Index Page
router.get('/', ensureAuthenticated, (req, res) => {
  Inventory.find({user: req.user.id})
    .sort({
      date: 'desc'
    })
    .then(inventories => {
      res.render('inventories/index', {
        inventories: inventories
      });
    });
});

// Add Inventory Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('inventories/add');
});

// Edit Inventory Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Inventory.findOne({
      _id: req.params.id
    })
    .then(inventory => {
      res.render('inventories/edit', {
        inventory: inventory
      });
    });
});

// Process Form
router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({
      text: 'Please add a Donor Name'
    });
  }
  if (!req.body.bloodgroup) {
    errors.push({
      text: 'Please select blood group'
    });
  }

  if (errors.length > 0) {
    res.render('inventories/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      bloodgroup: req.body.bloodgroup,
      age: req.body.age,
      contactno: req.body.contactno,
      email: req.body.email,
      address: req.body.address,
      registeredby: req.user.name,
      user: req.user.id
    }
    new Inventory(newUser)
      .save()
      .then(inventory => {
        req.flash('success_msg', 'Inventory "'+newUser.title +'" added ');
        res.redirect('/inventories');
      })
  }
});

//Edit Form Process
router.put('/:id', ensureAuthenticated, (req, res) => {
  // res.send('PUT');
  Inventory.findOne({
      _id: req.params.id
    })
    .then(inventory => {
      // new values
      inventory.title = req.body.title;
      inventory.bloodgroup = req.body.bloodgroup;
      inventory.age = req.body.age;
      inventory.contactno = req.body.contactno;
      inventory.email = req.body.email;
      inventory.address = req.body.address;
      inventory.registeredby = req.user.name;
      inventory.user = req.user.id;

      inventory.save()
        .then(inventory => {
          req.flash('success_msg', 'Inventory "'+inventory.title +'" updated ');
          res.redirect('/inventories');
        })
    });
})

//Delete Form Process
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Inventory.remove({_id: req.params.id})
    .then(() => {
      req.flash('success_msg', 'Inventory removed ');
      res.redirect('/inventories');
    });
});

// Repository Index Page
router.get('/repository', (req, res) => {
  Inventory.find()
    .sort({
      registeredby: 'asc'
    })
    .then(inventories => {
      res.render('inventories/repository', {
        inventories: inventories
      });
    });
});
