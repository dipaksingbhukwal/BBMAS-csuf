const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {
  ensureAuthenticated
} = require('../helpers/auth'); //Incude 'ensureAuthenticated' in get/set method call to prevent unauthorized access

module.exports = router;

// Load Inventory Model
require('../models/Event');
const Event = mongoose.model('events');

// Load User Model
require('../models/User');
const User = mongoose.model('users');

// Organization Route
router.get('/', (req, res) => {
  User.find()
    .sort({
      name: 'asc'
    })
    .then(users => {
      res.render('organizations/', {
        users: users
      });
    });
});

//Add events GET
router.get('/addevent', ensureAuthenticated, (req, res) => {
  res.render('organizations/addevent');
});

//Add events POST
router.post('/addevent', ensureAuthenticated, (req, res) => {
  Event.findOne({
      eventname: req.body.eventname
    })
    .then(event => {
      if (event) {
        req.flash('error_msg', 'Event already registered');
        res.redirect('/organizations/addevent');
      } else {
        var newEvent = new Event({
          eventname: req.body.eventname,
          organizedby: req.user.name,
          location: req.body.location,
          contactno: req.body.contactno,
          date: req.body.date,
          description: req.body.description,
          status: 'upcoming'
        });
        newEvent.save()
          .then(event => {
            req.flash('success_msg', 'New event registered');
            res.redirect('/users/myevents');
          })
          .catch(error => {
            console.log(error);
            return;
          });
      }
    });
  console.log(req.body.eventname);
  console.log(req.body.location);
  console.log(req.body.contactno);
  console.log(req.body.date);
  console.log(req.body.description);
});

// List events GET
router.get('/events', (req, res) =>{
  Event.find({status:'upcoming'})
    .sort({
      date: 'desc'
    })
    .then(events => {
      res.render('organizations/events', {
        events: events
      });
    });
});


// Edit Event Form
router.get('/editevent/:id', ensureAuthenticated, (req, res) => {
  Event.findOne({
      _id: req.params.id
    })
    .then(event => {
      res.render('organizations/editevent', {
        event: event
      });
    });
});

//Edit Form Process
router.put('/editevent/:id', ensureAuthenticated, (req, res) => {
  // res.send('PUT');
  Event.findOne({
      _id: req.params.id
    })
    .then(event => {
      // new values
      event.eventname = req.body.eventname;
      event.organizedby = req.user.name;
      event.location = req.body.location;
      event.contactno = req.body.contactno;
      event.date = req.body.date;
      event.description = req.body.description;
      event.status = 'upcoming'

      // console.log('/organizations/editevent/');
      event.save()
        .then(event => {
          req.flash('success_msg', 'Event "'+event.eventname +'" updated ');
          res.redirect('/users/myevents');
      })
    });
})

//Delete Event
router.delete('/deleteevent/:id', ensureAuthenticated, (req, res) => {
  Event.remove({_id: req.params.id})
    .then(() => {
      req.flash('success_msg', 'Event removed ');
      res.redirect('/users/myevents');
    });
});
