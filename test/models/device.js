require('./base.js')

const chai = require('chai');
const expect = chai.expect;
const Device = require('../../lib/models/device.js');

describe('Device Model', () => {

  it('should create a new device', (done) => {
    const device = new Device({
      name: 'Device 001',
      weatherEntries: [{moisture: 800, currentVoltage: 6}]
    });
    device.save((err) => {
      console.log(err)
      expect(err).to.be.null;
      expect(device.name).to.equal('Device 001')
      expect(device.weatherEntries[0].moisture).to.equal(800)
      expect(device.weatherEntries[0].currentVoltage).to.equal(6)
      expect(device.weatherEntries[0]).to.have.property('createdAt')
      expect(device.weatherEntries[0]).to.have.property('updatedAt')
      expect(device).to.have.property('createdAt')
      expect(device).to.have.property('updatedAt')
      done();
    });
  });

});