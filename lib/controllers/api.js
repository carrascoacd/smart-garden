var Device = require('../models/device.js');

exports.getIndex = function(req, res) {
  var weatherEntryList = [
    [
      { createdAt: '2011-07-01T19:15:28', moisture: 20 },
      { createdAt: '2011-07-02T19:15:28', moisture: 10 },
      { createdAt: '2011-07-03T19:15:28', moisture: 33 },
      { createdAt: '2011-07-04T19:15:28', moisture: 45 },
      { createdAt: '2011-07-05T19:15:28', moisture: 15 }
    ], [
      { createdAt: '2011-07-01T19:15:28', moisture: 10 },
      { createdAt: '2011-07-02T19:15:28', moisture: 15 },
      { createdAt: '2011-07-03T19:15:28', moisture: 13 },
      { createdAt: '2011-07-04T19:15:28', moisture: 15 },
      { createdAt: '2011-07-05T19:15:28', moisture: 60 }
    ]
  ]
  res.json({"waitForRunTime" : 5000, weatherEntryList: weatherEntryList});
};

exports.postIndex = function(req, res) {
  if (!req.body) return res.sendStatus(400);

  Device.findOne({name: req.body["name"]}, function (err, device) {
    if (!device) {
      device = new Device(req.body);
      device.save((err) => {
        if (err){
          res.status(422).json({"date" : Date.now(), "error": err});
        }
        else {
          res.json({"date" : Date.now(), "error": err});
        }
      });
    }
    else {
      device.update({$pushAll: {weatherEntries: req.body["weatherEntries"]}}, function(err){
        if (err){
          res.status(422).json({"date" : Date.now(), "error": err});
        }
        else {
          res.json({"date" : Date.now(), "error": err});
        }
      });
    }
  });

};

