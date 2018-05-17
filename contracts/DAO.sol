pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Claimable.sol";

/// @title a contract that implements a distributed organization with members, tasks, and voting.
/// @author Dennis Liu
contract DAO is Claimable {
    
    // type for a single member
    struct Member {
        bool voted;  // if true, that person already voted
        address delegate; // person delegated to
        uint vote;   // index of the voted proposal
    }

    // type for a single task
    struct Task {
        bytes32 title;   // short name (up to 32 bytes)
        string content; // proposal detail
        uint voteCount; // number of accumulated votes
    }
    
    // Maps each member's address to the member struct
    mapping(address => Member) public members;

    // A dynamically-sized array of `Task` structs.
    Task[] public tasks;
    
    /// @author Dennis Liu
    /// @notice 
    /// @dev constructor for the contract
    /// @param 
    function DAO() public {
    }
}