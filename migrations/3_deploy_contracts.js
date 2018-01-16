var EtherProfile = artifacts.require("./EtherProfile.sol");
var EtherProfileVersions = artifacts.require("./EtherProfileVersions.sol");

module.exports = function(deployer) {
  deployer.deploy(EtherProfileVersions);
  deployer.deploy(EtherProfile);
};
