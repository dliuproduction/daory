pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/ownership/Claimable.sol";
import "openzeppelin-solidity/contracts/ownership/Whitelist.sol";


/// @title a contract that implements a distributed organization with members, tasks, and voting.
/// @author Dennis Liu
contract DAO is Claimable, Whitelist {
    
    // type for a single member
    struct Member {
        string name; 
        uint vote;   // index of the voted proposal
    }

    // type for a single task
    struct Task {
        address proposer; // member who proposed the task 
        string title;  // task name
        string content; // task detail
        uint voteCount; // number of accumulated votes
    }

    // A dynamically-sized array of `Task` structs.
    Task[] public tasks;
    
    // Maps each member's address to the member struct
    mapping(address => Member) public members;

    // Lists each task's voted members
    mapping(uint => address[]) public votedMembers;

    event NameChanged(address addr, string name);
    event NewTask(uint taskId, address proposer, string title, string content);

    /// @author Dennis Liu
    /// @notice 
    /// @dev constructor for the contract
    constructor() public {

    }

    /// @author Dennis Liu
    /// @notice only whiteliseted addresses can change their 
    /// @param  _name new name of the member to change to
    function changeName(string _name) public onlyWhitelisted {
        members[msg.sender].name = _name;
        emit NameChanged(msg.sender, _name);
    }

    /// @author Dennis Liu
    /// @notice only whiteliseted addresses can vote on a task
    /// @param  _title title of the proposed task
    //  @param  _content content of the proposed task
    function propose(string _title, string _content) public onlyWhitelisted {
        uint taskId = tasks.push(Task(msg.sender, _title, _content, 0));
        // votedMembers(taskId) = address[];
        emit NewTask(taskId, msg.sender, _title, _content);
    }

    /// @author Dennis Liu
    /// @notice only whiteliseted addresses can vote on a task
    /// @param  taskNumber index of the task in tasks array
    function vote(uint taskNumber) public onlyWhitelisted {
        
    }
}