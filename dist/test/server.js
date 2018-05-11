'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../server.js');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test';
var should = _chai2.default.should();
_chai2.default.use(_chaiHttp2.default);

describe('Server Tests', function () {
    it('Testing /greeting method', function (done) {
        _chai2.default.request(_server2.default).get('/greeting').end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('Hi There!!, Welcome to node microservice boilerplate');
            done();
        });
    });
});