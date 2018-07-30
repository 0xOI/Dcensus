var DCensus = artifacts.require('./DCensus.sol');

contract('DCensus', function(accounts) {
  let dcensusInstance;

  beforeEach(function() {
    return DCensus.deployed().then((instance) => {
      dcensusInstance = instance;
    });
  });

  it('should initialize with an empty state', function() {
    return dcensusInstance.getStat().then((data) => {
      assert.equal(data[0], '', 'no statistic found');
    });
  });
});
