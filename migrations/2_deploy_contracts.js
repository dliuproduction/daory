var Ownable = artifacts.require('openzeppelin-solidity/contracts/ownership/Ownable.sol');
var Destructible = artifacts.require('openzeppelin-solidity/contracts/lifecycle/Destructible.sol');
var Authentication = artifacts.require("./Authentication.sol");
var DAO = artifacts.require("./DAO.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Destructible);
  deployer.deploy(Destructible);
  deployer.link(Destructible, Authentication);
  deployer.deploy(Authentication);
  deployer.link(Authentication, DAO);
  deployer.deploy(DAO);
};
