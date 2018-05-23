pragma solidity ^0.4.23;

// import with full path to use remixd sharing folder and remix IDE
import '../node_modules/openzeppelin-solidity/contracts/lifecycle/Destructible.sol';
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Authentication is Destructible {
using SafeMath for uint256;

  // type for a single member
  struct Member {
    string name;
  }

  // Maps each member's address to the member struct
  mapping(address => Member) public members;

  uint256 public memberCount; // Stores number of members

  modifier onlyExistingMember {
    // Check if member exists

    require(bytes(members[msg.sender].name).length != 0);
    _;
  }

  modifier onlyValidName(string name) {
    // Check if name is empty

    require(bytes(name).length != 0);
    _;
  }

  /// @notice Login a member
  /// @return the member's name 
  function login() view public onlyExistingMember returns (string) {
    return (members[msg.sender].name);
  }

  /// @notice Sign up a new member
  /// @param  name name of the member
  /// @return member name if member exists or after a member is created
  function signup(string name) public onlyValidName(name) returns (string) {
    
    if (bytes(members[msg.sender].name).length == 0) {
        members[msg.sender].name = name;
        memberCount++;
        return (members[msg.sender].name);
    }
    return (members[msg.sender].name);
  }

  /// @notice Update member's name
  /// @param  name new name of the member to change to
  function update(string name) public onlyValidName(name) onlyExistingMember returns (string) {

    if (bytes(members[msg.sender].name).length != 0) {
        members[msg.sender].name = name;
        return (members[msg.sender].name);
    }
  }
}
