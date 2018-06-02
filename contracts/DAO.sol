pragma solidity ^0.4.23;

import "./Authentication.sol";

/// @title A distributed organization with members, tasks, and voting.
/// @author Dennis Liu
contract DAO is Authentication {
using SafeMath for uint256;

    // type for a single task
    struct Task {
        uint taskId;
        address proposer; // address who proposed the task 
        string name; // member name who proposed the task
        string title;  // task name
        string content; // task detail
        uint256 voteCount; // number of accumulated votes
        bool nonconsensus; // bool to signal that someone voted no
        bool finished; // bool to signal voting has finished
    }

    // A dynamically-sized array of `Task` structs.
    Task[] public tasks;

    // Lists each task's voted members
    // Use a uint to represent 3 states, 0: unvoted; 1: yes; 2: no
    mapping(uint => mapping (address => uint)) public votedMap;
    mapping(uint => address[]) private votedList;

    modifier taskVotable(uint taskId) {
        // Check if the task can be voted on

        require(!tasks[taskId].finished, "Voting on this task has finished");
        require(votedMap[taskId][msg.sender] == 0, "Member has already voted on this task");
        _;
    }

    modifier taskExists(uint taskId) {
        // Check if the task exists

        require(bytes(tasks[taskId].title).length != 0, "Task does not exist");
        _;
    }

    modifier onlyProposer(uint taskId) {
        // Check if member is the proposer of the task

        require(tasks[taskId].proposer == msg.sender, "Member is not the proposer of the task");
        _;
    }

    event taskUpdated();
    // event newTask(uint taskId, address proposer, string name, string title, string content);
    // event newVote(uint taskId, uint voteCount);
    // event voteFinished(uint taskId, bool approved);
    // event taskRemoved(uint taskId);

    /// @notice Propose a new task
    /// @notice Only existing user addresses can propose a task. proposer doesn't have to vote yes for their tasks
    /// @param  title title of the proposed task
    /// @param  content content of the proposed task
    function propose(string title, string content) public onlyExistingMember {
        
        // push returns new length, hence the new task's ID is length - 1 
        uint taskId = tasks.push(Task(0, msg.sender, members[msg.sender].name, title, content, 0, false, false)) - 1;
        tasks[taskId].taskId = taskId;
        emit taskUpdated();
        // emit newTask(taskId, msg.sender, members[msg.sender].name, title, content);
    }

    /// @notice Vote on a task by its id
    /// @notice If anyone votes no, the task will be disapproved when voting is finished
    /// @param  taskId index of the task in tasks array
    /// @param  agree boolean of true or false signifying yes or no vote
    function vote(uint taskId, bool agree) public onlyExistingMember taskExists(taskId) taskVotable(taskId) {
        
        // if anyone votes no, there will be no consensus in the end
        if (!agree) {
            tasks[taskId].nonconsensus = true;
            votedMap[taskId][msg.sender] = 2; // 2 maps to no
        } else {
            votedMap[taskId][msg.sender] = 1; // 1 maps to yes
        }
        tasks[taskId].voteCount++;
        votedList[taskId].push(msg.sender);
        emit taskUpdated();
        // emit newVote(taskId, tasks[taskId].voteCount);
        
        // set task as finished emit voteFinished event when all members have voted
        if (tasks[taskId].voteCount >= memberCount) {
            tasks[taskId].finished = true;
            emit taskUpdated();
            // emit voteFinished(taskId, !tasks[taskId].nonconsensus);
        }
    }

    /// @notice Remove a disapproved task
    /// @notice Only the owner of the task 
    /// @param  taskId index of the task in tasks array
    function remove(uint taskId) public onlyExistingMember taskExists(taskId) onlyProposer(taskId) {
        delete tasks[taskId];
        delete votedList[taskId];
        emit taskUpdated();
        // emit taskRemoved(taskId);
    }
    
    /// @notice Return voted members for a task after its voting is finished
    /// @notice This prevents member's votes being influenced by existing votes
    /// @param taskId index of the task in tasks array
    /// @return voted member addresses in an array
    function getVoted(uint taskId) public view taskExists(taskId) onlyExistingMember returns (address[]) {
        require(tasks[taskId].finished, "Voting on this task has not finished");
        return votedList[taskId];
    }
    
    function getTaskCount() public view onlyExistingMember returns (uint) {
      return tasks.length;
    } 
}