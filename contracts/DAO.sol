pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/ownership/Claimable.sol";
import "./Authentication.sol";

/// @title a contract that implements a distributed organization with members, tasks, and voting.
/// @author Dennis Liu
contract DAO is Claimable, Authentication {

    // type for a single task
    struct Task {
        address proposer; // member who proposed the task 
        string title;  // task name
        string content; // task detail
        uint voteCount; // number of accumulated votes
    }

    // A dynamically-sized array of `Task` structs.
    Task[] public tasks;

    // Lists each task's voted members
    mapping(uint => address[]) public votedMembers;

    event NewTask(uint taskId, address proposer, string title, string content);

    /// @author Dennis Liu
    /// @notice 
    /// @dev constructor for the contract
    constructor() public {

    }

    /// @author Dennis Liu
    /// @notice only whiteliseted addresses can vote on a task
    /// @param  title title of the proposed task
    //  @param  content content of the proposed task
    function propose(string title, string content) public onlyExistingUser {
        uint taskId = tasks.push(Task(msg.sender, title, content, 0));
        // votedMembers(taskId).push(msg.sender);
        emit NewTask(taskId, msg.sender, title, content);
    }

    /// @author Dennis Liu
    /// @notice only whiteliseted addresses can vote on a task
    /// @param  taskId index of the task in tasks array
    function vote(uint taskId) public onlyExistingUser {
        votedMembers[taskId].push(msg.sender);
    }
}