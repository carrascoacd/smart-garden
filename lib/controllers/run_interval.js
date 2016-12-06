var RunInterval = require('../models/run_interval.js');

exports.getIndex = function(req, res) {
  RunInterval.find({}, function(err, result) {
    res.json({"content" : result})
  });
};

exports.create = function(req, res) {
  if (!req.body) return res.sendStatus(400);
  var runInterval = new RunInterval(req.body);
  runInterval.save((err) => {
    res.json({"date" : Date.now(), "error": err});
  });
};

