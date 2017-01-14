var Device = require('../models/device.js');
var async = require('async')

exports.getIndex = function(req, res) {
  Device.find().lean().exec(function (err, result) {
    res.json({"waitForRunTime" : 5000, deviceList: result});
  });
};

exports.postIndex = function(req, res) {
  if (!req.body) return res.sendStatus(400);

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
    if (err){
      res.status(422).json({"date" : Date.now(), "error": err});
    }
    else {
      res.json({"date" : Date.now(), "error": err});
    }
  });

};

