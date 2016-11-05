const chai = require('chai');
const expect = chai.expect;
const RunInterval = require('../../lib/models/run_interval.js');

describe('runIntervalSchema Model', () => {

  it('should create a new RunInterval', (done) => {
    const runInterval = new RunInterval({
      milliseconds: 600
    });
    runInterval.save((err) => {
      expect(err).to.be.null;
      expect(runInterval.milliseconds).to.equal(600);
      expect(runInterval).to.have.property('createdAt');
      expect(runInterval).to.have.property('updatedAt');
      done();
    });
  });

});