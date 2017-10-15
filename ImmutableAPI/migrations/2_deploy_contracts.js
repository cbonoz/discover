const ImmutableAPI = artifacts.require("./ImmutableAPI.sol");
// const SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(ImmutableAPI);
  // deployer.deploy(SimpleStorage);
};
