var Device = require('../models/device.js');
var async = require('async')

exports.getTiming = function(req, res) {
  console.log(req.query);
  res.json({"waitForRunTime" : 5000});
};

exports.getDevices = function(req, res) {
  Device.find().lean().exec(function (err, result) {
    res.json({deviceList: result});
  });
};

exports.postDevices = function(req, res) {
  console.log(req.body);
  async.each(req.body, function(deviceParams, callback) {
    Device.findOne({name: deviceParams["name"]}, function (err, device) {
      if (!device) {
        device = new Device(deviceParams)
      }
      else {
        async.each(deviceParams["weatherEntries"], function(weatherEntry, pushCallback){
          device.weatherEntries.push(weatherEntry);
          pushCallback();
        })
      }
      device.save((err) => {
        console.log(err)
        callback(err);
      });
    });
  }, 
  function(err) {
    var waitForRunTime = 5000
    if (err){
      res.status(422).json({"waitForRunTime" : waitForRunTime, "error": err});
    }
    else {
      res.json({"waitForRunTime" : waitForRunTime, "error": err});
    }
  });

};

