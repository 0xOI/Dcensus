var DCensus = artifacts.require('./DCensus.sol');

module.exports = function(deployer) {
  deployer.deploy(DCensus);
};
