var Device = require('../models/device.js');
var RunInterval = require('../models/run_interval.js');
var DeviceMapper = require('../models/device_mapper.js');
var async = require('async')


exports.getRunInterval = function(req, res) {
  RunInterval.findOne({}, function (err, runInterval) {
    if (err){
      res.status(422).json({"waitForRunTime" : null, "error": err});
    }
    else {
      if (!runInterval) {
        res.json({"waitForRunTime" : 5000, "error": err});
      }
      else {
        res.json({"waitForRunTime" : runInterval.value, "error": err});
      }
    }
  });
};

exports.postRunInterval = function(req, res) {
  console.log(req.body);
  RunInterval.findOne({}, function (err, runInterval) {
    if (!runInterval) {
      runInterval = new RunInterval(req.body)
    }
    else {
      runInterval.value = req.body["value"]
    }
    runInterval.save((err) => {
      console.log(err)
      if (err){
        res.status(422).json({"error": err});
      }
      else {
        res.json({"error": err});
      }
    });
  });
};

exports.getDevices = function(req, res) {
  Device.find().lean().exec(function (err, result) {
    res.json({deviceList: result});
  });
};

exports.postDevices = function(req, res) {
  console.log(req.body);
  var params = DeviceMapper.map(req.body);
  async.each(params, function(deviceParams, callback) {
    Device.update(
      { name: deviceParams["name"] },
      { name: deviceParams["name"], 
        $push: { weatherEntries: { $each: deviceParams["weatherEntries"], $position: 0 }}}, 
      { upsert: true },
      function(err) {
        console.log(err)
        callback(err);
      }
    );
  }, 
  function(err) {
    RunInterval.findOne({}, function (err, runInterval) {
      if (err){
        res.status(422).json({"waitForRunTime" : null, "error": err});
      }
      else {
        if (!runInterval) {
          res.json({"waitForRunTime" : 5000, "error": err});
        }
        else {
          res.json({"waitForRunTime" : runInterval.value, "error": err});
        }
      }
    });
  });

};

