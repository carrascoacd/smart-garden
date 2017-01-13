var WeatherEntry = require('../models/weather_entry.js');

exports.getIndex = function(req, res) {
  var weatherEntryList = [
    [
      { x: '2011-07-01T19:15:28', y: 20 },
      { x: '2011-07-02T19:15:28', y: 10 },
      { x: '2011-07-03T19:15:28', y: 33 },
      { x: '2011-07-04T19:15:28', y: 45 },
      { x: '2011-07-05T19:15:28', y: 15 }
    ], [
      { x: '2011-07-01T19:15:28', y: 10 },
      { x: '2011-07-02T19:15:28', y: 15 },
      { x: '2011-07-03T19:15:28', y: 13 },
      { x: '2011-07-04T19:15:28', y: 15 },
      { x: '2011-07-05T19:15:28', y: 10 }
    ]
  ]
  res.json({"waitForRunTime" : 5000, weatherEntryList: weatherEntryList});
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

