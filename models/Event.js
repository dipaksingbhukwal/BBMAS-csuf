const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EventSchema = new Schema({
  eventname: {
    type: String,
    required: true
  },
  organizedby: {
    type: String,
    // ref: 'users',
    required: true
  },
  location: {
    type: String,
    required: false
  },
  contactno: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    require: false
  },
  status: {
    type: String,
    default: 'upcoming',
    requir: true
  }
});

mongoose.model('events', EventSchema);
