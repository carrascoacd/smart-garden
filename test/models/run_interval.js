require('./base.js')

const chai = require('chai');
const expect = chai.expect;
const RunInterval = require('../../lib/models/run_interval.js');

describe('runIntervalSchema Model', () => {

  it('should create a new RunInterval', (done) => {
    const start_at = Date.now()
    const runInterval = new RunInterval({
      seconds: 600,
      start_at: start_at,
      active: true
    });
    runInterval.save((err) => {
      expect(err).to.be.null;
      expect(runInterval.seconds).to.equal(600);
      expect(runInterval.start_at.getTime()).to.equal(start_at);
      expect(runInterval.active).to.equal(true);
      expect(runInterval).to.have.property('createdAt');
      expect(runInterval).to.have.property('updatedAt');
      done();
    });
  });

});