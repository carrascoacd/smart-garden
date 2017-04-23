require('./base.js')

const chai = require('chai');
const expect = chai.expect;
const DeviceMapper = require('../../lib/models/device_mapper.js');

describe('DeviceMapper', () => {

  it('should map the device params', (done) => {
    var data = DeviceMapper.map([{n: "Device name", we: [{m: 800, cv: 6}]}]);
    expect(data[0].name).to.equal('Device name');
    expect(data[0].weatherEntries[0].moisture).to.equal(800);
    expect(data[0].weatherEntries[0].currentVoltage).to.equal(6);
    done();
  });

  it('should keep intact the device params', (done) => {
    var data = DeviceMapper.map([{name: "Device name", weatherEntries: [{moisture: 800, currentVoltage: 6}]}]);
    expect(data[0].name).to.equal('Device name');
    expect(data[0].weatherEntries[0].moisture).to.equal(800);
    expect(data[0].weatherEntries[0].currentVoltage).to.equal(6);
    done();
  });
});