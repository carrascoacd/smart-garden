var mongoose = require('mongoose');

var runIntervalSchema = new mongoose.Schema({
  seconds: {
    type: Number,
    required: true
  },
  start_at: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    required: true,
    index: { unique: true }
  }
}, { timestamps: true });


var RunInterval = mongoose.model('RunInterval', runIntervalSchema);

module.exports = RunInterval;