var EtherProfile = artifacts.require("./EtherProfile.sol");

module.exports = function(deployer) {
  deployer.deploy(EtherProfile);
};
