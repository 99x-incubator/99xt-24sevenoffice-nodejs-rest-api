'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.core = undefined;
exports.healthcheckHandler = healthcheckHandler;
exports.appInit = appInit;

var _dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  console.log('Development enviornment detected, loading enviornment variables from .env file.');
  (0, _dotenv.config)();
}

var core = exports.core = {
  APP_NAME: process.env.APP_NAME || 'Server',
  APP_PORT: process.env.APP_PORT || 5000,
  ENABLED: process.env.ENABLED || 1
};

function healthcheckHandler(req, res) {
  res.status(200).send({ done: 'true' });
}

function appInit(app, _ref) {
  var ENABLED = _ref.ENABLED,
      APP_NAME = _ref.APP_NAME,
      APP_PORT = _ref.APP_PORT;

  if (ENABLED) {
    app.listen(APP_PORT);
    console.log('Application "' + APP_NAME + '" is running on port ' + APP_PORT);
  } else {
    console.log('"' + APP_NAME + '" App is disabled.');
  }
}