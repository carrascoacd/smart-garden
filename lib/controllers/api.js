var WeatherEntry = require('../models/weather_entry.js');

exports.getIndex = function(req, res) {
  res.json({"waitForRunTime" : 5000});
};

exports.postIndex = function(req, res) {
  if (!req.body) return res.sendStatus(400);
  var weatherEntry = new WeatherEntry(req.body);
  weatherEntry.save((err) => {
    if (err){
      res.status(422).json({"date" : Date.now(), "error": err});
    }
    else {
      res.json({"date" : Date.now(), "error": err});
    }
  });
};

