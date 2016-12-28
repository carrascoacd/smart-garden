var mongoose = require('mongoose');

var weatherEntrySchema = new mongoose.Schema({
  moisture: {
    type: Number,
    required: true
  },
  batteryVoltage: {
    type: Number,
    required: true
  }
}, { timestamps: true });


var WeatherEntry = mongoose.model('WeatherEntry', weatherEntrySchema);

module.exports = WeatherEntry;