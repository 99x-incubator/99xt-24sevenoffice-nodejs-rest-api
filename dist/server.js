'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('./config');

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _morgan2.default)('combined'));

app.get('/', _config.healthcheckHandler);
app.get('/healthcheck', _config.healthcheckHandler);

app.get('/greeting', function (req, res) {
  res.status(200).json({ message: 'Hi There!!, Welcome to node microservice boilerplate' });
});

(0, _config.appInit)(app, _config.core);

exports.default = app; // For testing purposes