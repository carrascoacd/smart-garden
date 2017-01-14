var mongoose = require('mongoose');

var weatherEntriesSchema = new mongoose.Schema({
  moisture: {
    type: Number,
    required: true
  },
  currentVoltage: {
    type: Number,
    required: true
  },
}, { timestamps: true });


var deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  weatherEntries: [weatherEntriesSchema]
}, { timestamps: true });


var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;