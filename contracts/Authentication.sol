pragma solidity ^0.4.23;

// import with full path to use remixd sharing folder and remix IDE
import '../node_modules/openzeppelin-solidity/contracts/lifecycle/Destructible.sol';
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Authentication is Destructible {
using SafeMath for uint;

  // type for a single member
  struct Member {
    string name;
  }

  // Maps each member's address to the member struct
  mapping(address => Member) public members;

  uint internal memberCount; // Stores number of members

  modifier onlyExistingMember {
    // Check if member exists or terminate

    require(bytes(members[msg.sender].name).length != 0);
    _;
  }

  modifier onlyValidName(string name) {
    // Only valid names allowed

    require(bytes(name).length != 0);
    _;
  }

  function login() view public onlyExistingMember returns (string) {
    return (members[msg.sender].name);
  }

  function signup(string name) public onlyValidName(name) returns (string) {
    // Check if member exists.
    // If yes, return member name.
    // If no, check if name was sent.
    // If yes, create and return member name.

    if (bytes(members[msg.sender].name).length != 0) {
        members[msg.sender].name = name;
        memberCount.add(1);
        return (members[msg.sender].name);
    }
    return (members[msg.sender].name);
  }

  /// @notice only existing user addresses can change their name
  /// @param  name new name of the member to change to
  function update(string name) public onlyValidName(name) onlyExistingMember returns (string) {

    if (bytes(members[msg.sender].name).length != 0) {
        members[msg.sender].name = name;
        return (members[msg.sender].name);
    }
  }
}
