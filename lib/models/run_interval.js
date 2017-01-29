var mongoose = require('mongoose');

var runIntervalSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
}, { timestamps: true });


var RunInterval = mongoose.model('RunInterval', runIntervalSchema);

module.exports = RunInterval;