var request = require('supertest');
var app = require('../../lib/app.js');

describe('GET /api/run-interval', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/api/run-interval')
      .expect(200, done);
  });
});

describe('POST /api/run-interval', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .post('/api/run-interval')
      .type('json')
      .send({value: 5000})
      .expect(200, done);
  });
});

describe('GET /api/devices', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/api/devices')
      .expect(200, done);
  });
});

describe('POST /api/devices', function() {
  it('should return 200 OK (update)', function(done) {
    request(app)
      .post('/api/devices')
      .type('json')
      .send([{weatherEntries:[{moisture: 500, currentVoltage: 5}], name: 'Device 002'}])
      .expect(200, done);
  });
});

describe('POST /api/devices', function() {
  it('should return 200 OK (create)', function(done) {
    request(app)
      .post('/api/devices')
      .type('json')
      .send([{weatherEntries:[{moisture: 100, currentVoltage: 5}], name: 'Device 002'}])
      .expect(200, done);
  });
});