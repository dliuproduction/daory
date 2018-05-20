pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./Authentication.sol";

/// @title A distributed organization with members, tasks, and voting.
/// @author Dennis Liu
contract DAO is Authentication {
using SafeMath for uint;

    // type for a single task
    struct Task {
        address proposer; // member who proposed the task 
        string title;  // task name
        string content; // task detail
        uint voteCount; // number of accumulated votes
        bool nonconsensus; // bool to signal that someone voted no
        bool finished; // bool to signal voting has finished
    }

    // A dynamically-sized array of `Task` structs.
    Task[] public tasks;

    // Lists each task's voted members
    mapping(uint => mapping (address => bool)) public votedMembers;


    modifier taskVotable(uint taskId) {
        // Check if the task can be voted on

        require(!tasks[taskId].finished, "Voting on this task has finished");
        require(!votedMembers[taskId][msg.sender], "Member has already voted on this task");
        _;
    }

    modifier taskExists(uint taskId) {
        // Check if the task exists

        require(tasks[taskId].proposer, "Task does not exist");
        _;
    }

    modifier onlyProposer(uint taskId) {
        // Check if member is the proposer of the task

        require(tasks[taskId].proposer == msg.sender, "Member is not the proposer of the task");
        _;
    }

    event newTask(uint taskId, address proposer, string title, string content, uint voteCount);
    event voteFinished(uint taskId, bool approved);

    /// @notice Propose a new task
    /// @notice Only existing user addresses can propose a task, proposers must vote for their tasks
    /// @param  title title of the proposed task
    /// @param  content content of the proposed task
    /// @event the newly proposed task's parameters
    function propose(string title, string content) public onlyExistingMember {
        uint taskId = tasks.push(Task(msg.sender, title, content, 1, false, false));
        votedMembers[taskId][msg.sender] = true;
        emit newTask(taskId, msg.sender, title, content, 1);
    }

    /// @notice Vote on a task by its id
    /// @notice If anyone votes no, the task will be disapproved when voting is finished
    /// @param  taskId index of the task in tasks array
    /// @param  vote boolean of true or false signifying yes or no vote
    /// @return ID of the task being voted on, and its new vote count
    function vote(uint taskId, bool vote) public onlyExistingMember taskExists(taskId) taskVotable(taskId) returns (uint, uint) {
        
        if (!vote) {
            tasks[taskId].nonconsensus = true;
        }
        tasks[taskId].voteCount.add(1);
        if (tasks[taskId].voteCount >= memberCount) {
            tasks[taskId].finished = true;
            emit voteFinished(taskId, !tasks[taskId].nonconsensus);
        }
        votedMembers[taskId][msg.sender] = true;
        return (taskId, tasks[taskId].voteCount);
    }

    /// @notice Remove a disapproved task
    /// @notice Only the owner of the task 
    /// @param  taskId index of the task in tasks array
    function remove(uint taskId) public onlyExistingMember taskExists(taskId) onlyProposer(taskId) {
        delete tasks[taskId];
    }
}