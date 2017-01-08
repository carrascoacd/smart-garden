require('./base.js')

const chai = require('chai');
const expect = chai.expect;
const WeatherEntry = require('../../lib/models/weather_entry.js');

describe('WeatherEntry Model', () => {

  it('should create a new weatherEntry', (done) => {
    const weatherEntry = new WeatherEntry({
      moisture: 600,
      deviceName: 'Device 002',
      deviceVoltage: 6
    });
    weatherEntry.save((err) => {
      console.log(err)
      expect(err).to.be.null;
      expect(weatherEntry.moisture).to.equal(600);
      expect(weatherEntry.deviceName).to.equal('Device 002');
      expect(weatherEntry.deviceVoltage).to.equal(6);
      expect(weatherEntry).to.have.property('createdAt');
      expect(weatherEntry).to.have.property('updatedAt');
      done();
    });
  });

});