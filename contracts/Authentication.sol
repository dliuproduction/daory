pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/lifecycle/Destructible.sol';
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Authentication is Destructible {
using SafeMath for uint;

  // type for a single member
  struct Member {
    bytes32 name;
  }

  // Maps each member's address to the member struct
  mapping(address => Member) private members;

  uint internal memberCount; // Stores number of members

  modifier onlyExistingMember {
    // Check if member exists or terminate

    require(!(members[msg.sender].name == 0x0));
    _;
  }

  modifier onlyValidName(bytes32 name) {
    // Only valid names allowed

    require(!(name == 0x0));
    _;
  }

  function login() view public onlyExistingMember returns (bytes32) {
    return (members[msg.sender].name);
  }

  function signup(bytes32 name) public onlyValidName(name) returns (bytes32) {
    // Check if member exists.
    // If yes, return member name.
    // If no, check if name was sent.
    // If yes, create and return member name.

    if (members[msg.sender].name == 0x0) {
        members[msg.sender].name = name;
        memberCount.add(1);
        return (members[msg.sender].name);
    }
    return (members[msg.sender].name);
  }

  /// @notice only existing user addresses can change their name
  /// @param  name new name of the member to change to
  function update(bytes32 name) public onlyValidName(name) onlyExistingMember returns (bytes32) {

    if (members[msg.sender].name != 0x0) {
        members[msg.sender].name = name;
        return (members[msg.sender].name);
    }
  }
}
