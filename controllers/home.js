var components = require('../public/components.js')
  , React = require('react')
  , ReactDOM = require('react-dom/server')
  , WeatherEntry = require('../models/weather_entry.js')

/**
 * GET /
 * Home page.
 */
exports.getIndex = function(req, res) {
  var WeatheEntryList = React.createFactory(components.WeatheEntryList);
  WeatherEntry.find({}, function(err, result) {
    res.render('index', {
      react: ReactDOM.renderToString(WeatheEntryList({weatherEntryList: result}))
    })
  });

};