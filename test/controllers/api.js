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
  it('should return 200 OK', function(done) {
    request(app)
      .post('/api')
      .type('json')
      .send({moisture: 500, deviceVoltage: 5, deviceName: 'Device 001'})
      .expect(200, done);
  });
});