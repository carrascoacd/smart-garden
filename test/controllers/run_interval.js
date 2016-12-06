var request = require('supertest');
var app = require('../../lib/app.js');

describe('GET /api/run-intervals', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/api/run-intervals')
      .expect(200, done);
  });
});

describe('POST /api/run-intervals', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .post('/api/run-intervals')
      .expect(200, done);
  });
});