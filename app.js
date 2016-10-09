/**
 * Module dependencies.
 */
var express = require('express');
var dotenv = require('dotenv');
var mongoose = require('mongoose');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 *
 * Default path: .env (You can remove the path argument entirely, after renaming `.env.example` to `.env`)
 */
dotenv.load({ path: '.env' });

/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home');

/**
 * Create Express server.
 */
var app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

/**
 * Primary app routes.
 */
app.get('/', homeController.index);

/**
 * Start Express server.
 */
app.listen(process.env.PORT, function () {
  console.log('Example app listening on port: ' + process.env.PORT);
});

module.exports = app;