var Authentication = artifacts.require("./Authentication.sol");
var DAO = artifacts.require("./DAO.sol");

module.exports = function(deployer) {
  deployer.deploy(Authentication);
  deployer.deploy(DAO);
};
