require('./base.js')

const chai = require('chai');
const expect = chai.expect;
const WeatherEntry = require('../../lib/models/weather_entry.js');

describe('WeatherEntry Model', () => {

  it('should create a new weatherEntry', (done) => {
    const weatherEntry = new WeatherEntry({
      moisture: 600
    });
    weatherEntry.save((err) => {
      expect(err).to.be.null;
      expect(weatherEntry.moisture).to.equal(600);
      expect(weatherEntry).to.have.property('createdAt');
      expect(weatherEntry).to.have.property('updatedAt');
      done();
    });
  });

});