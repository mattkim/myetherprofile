// var EtherProfileVersions = artifacts.require("./EtherProfileVersions.sol");
var EtherProfile = artifacts.require("./EtherProfile.sol");

module.exports = function(deployer) {
  // deployer.deploy(EtherProfileVersions);
  deployer.deploy(EtherProfile);
};
