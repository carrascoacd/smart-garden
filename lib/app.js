/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env (You can remove the path argument entirely, after renaming `.env.example` to `.env`)
 */

if ((process.env.NODE_ENV || 'development') === 'development') {
  require('dotenv').load({ path: '.env' });
} 

/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home');
var apiController = require('./controllers/api');

/**
 * Create Express server.
 */
var app = express();
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'))

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

/**
 * Primary app routes.
 */

var jsonParser = bodyParser.json({ type: '*/*' })

app.get('/', homeController.getIndex);
app.get('/api', apiController.getIndex);
app.post('/api', jsonParser, apiController.postIndex);

/**
 * Start Express server.
 */
app.listen(process.env.PORT, function () {
  console.log('Example app listening on port: ' + process.env.PORT);
});

module.exports = app;