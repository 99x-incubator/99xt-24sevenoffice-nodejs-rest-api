import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';

process.env.NODE_ENV = 'test';
const should = chai.should();
chai.use(chaiHttp);

describe('Server Tests', () => {
  it('Testing /healthcheck method', (done) => {
    chai.request(server).get('/healthcheck')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('done');
      res.body.should.have.property('done').eql('true');
      done();
    });
  });

  it('Get API endpoint is authenticatd using valid GWT token', (done) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhdGlvbiI6ImFkbWluIiwiaWQiOiJtYXN0ZXIiLCJpYXQiOjE1MDk1MzY0OTUsImV4cCI6MTgyNTExMjQ5NX0.CrCaSVst6afayULXI_8guCGer0e4t6MiF89Y-oHmHBU';
    chai.request(server)
    .get('/greeting')
    .set('x-token',token)
    .end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('Not sending the x-token with the endpoint will result in error', (done) => {
    chai.request(server)
    .get('/greeting')
    .end((err, res) => {
      res.should.have.status(500);
      done();
    });
  });

  it('Sending invalid token will result in 403 forbidden error', (done) => {
    const token = 'eyJhbGciOiJIUsdfsdfsdfzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhdGlvbiI6ImFkbWluIiwiaWQiOiJtYXN0ZXIiLCJpYXQiOjE1MDk1MzY0OTUsImV4cCI6MTgyNTExMjQ5NX0.CrCaSVst6afayULXI_8guCGer0e4t6MiF89Y-oHmHBU';
    chai.request(server)
    .get('/greeting')
    .set('x-token',token)
    .end((err, res) => {
      res.should.have.status(403);
      done();
    });
  });


});
