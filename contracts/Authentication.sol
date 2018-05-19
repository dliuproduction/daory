pragma solidity ^0.4.2;

import 'openzeppelin-solidity/contracts/lifecycle/Destructible.sol';

contract Authentication is Destructible {

  // type for a single member
  struct Member {
    bytes32 name;
  }

  // Maps each member's address to the member struct
  mapping(address => Member) private members;

  uint private userId; // Stores user id temporarily

  modifier onlyExistingUser {
    // Check if user exists or terminate

    require(!(members[msg.sender].name == 0x0));
    _;
  }

  modifier onlyValidName(bytes32 name) {
    // Only valid names allowed

    require(!(name == 0x0));
    _;
  }

  function login() view public onlyExistingUser returns (bytes32) {
    return (members[msg.sender].name);
  }

  function signup(bytes32 name) public onlyValidName(name) returns (bytes32) {
    // Check if user exists.
    // If yes, return user name.
    // If no, check if name was sent.
    // If yes, create and return user.

    if (members[msg.sender].name == 0x0)
    {
        members[msg.sender].name = name;

        return (members[msg.sender].name);
    }

    return (members[msg.sender].name);
  }

  /// @author Dennis Liu
  /// @notice only whiteliseted addresses can change their 
  /// @param  name new name of the member to change to
  function update(bytes32 name) public onlyValidName(name) onlyExistingUser returns (bytes32) {

    if (members[msg.sender].name != 0x0)
    {
        members[msg.sender].name = name;

        return (members[msg.sender].name);
    }
  }
}
