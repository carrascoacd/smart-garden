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

if ((process.env.NODE_ENV) === 'development') {
  require('dotenv').load({ path: '.env.dev' });
}
else if ((process.env.NODE_ENV) === 'test') {
  require('dotenv').load({ path: '.env.test' });
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
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/', express.static('public'));

// This is necesessary in order to avoid the MaterialUI userAgent warning
global.navigator = { userAgent: 'all' };

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
app.get('/api/devices', apiController.getDevices);
app.post('/api/devices', jsonParser, apiController.postDevices);
app.get('/api/run-interval', apiController.getRunInterval);
app.post('/api/run-interval', jsonParser, apiController.postRunInterval);

/**
 * Start Express server.
 */
app.listen(process.env.PORT, function () {
  console.log('Example app listening on port: ' + process.env.PORT);
});

module.exports = app;