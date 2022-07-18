const demo = artifacts.require("Demo");

module.exports = function (deployer) {
  deployer.deploy(demo);
};
