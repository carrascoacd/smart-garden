var request = require('supertest');
var app = require('../../lib/app.js');

describe('GET /api', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/api')
      .expect(200, done);
  });
});

describe('POST /api', function() {
  it('should return 200 OK (update)', function(done) {
    request(app)
      .post('/api')
      .type('json')
      .send({weatherEntries:[{moisture: 500}], voltage: 5, name: 'Device 002'})
      .expect(200, done);
  });
});

describe('POST /api', function() {
  it('should return 200 OK (create)', function(done) {
    request(app)
      .post('/api')
      .type('json')
      .send({weatherEntries:[{moisture: 100}], voltage: 5, name: 'Device 002'})
      .expect(200, done);
  });
});