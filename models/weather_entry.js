var mongoose = require('mongoose');

var weatherEntrySchema = new mongoose.Schema({
  moisture: Number
}, { timestamps: true });


var WeatherEntry = mongoose.model('WeatherEntry', weatherEntrySchema);

module.exports = WeatherEntry;