var React = require('react');
var ReactDOM = require('react-dom/server');
var WeatherEntry = require('../models/weather_entry.js');

// import WeatherEntryList from '../public/WeatherEntryList';
import App from '../public/App';

/**
 * GET /
 * Home page.
 */
exports.getIndex = function(req, res) {
  WeatherEntry.find({}, function(err, result) {
    res.render('index', {
      // react: ReactDOM.renderToString(<WeatherEntryList weatherEntryList = {result}/>)
      react: ReactDOM.renderToString(<App/>)
    })
  });

};