const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EventSchema = new Schema({
  eventname: {
    type: String,
    required: true
  },
  organizedby: {
    type: Schema.Types.ObjectId,
    ref: 'users'
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
  }
});

mongoose.model('events', EventSchema);
