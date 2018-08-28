var DAO = artifacts.require("DAO");

contract('DAO', async (accounts) => {
  let expectThrow = require("openzeppelin-solidity/test/helpers/expectThrow.js").expectThrow
  let inputName1 = 'Alice';
  let inputName2 = 'Bob';
  let emptyName = '';
  let account1 = accounts[0]
  let account2 = accounts[1]
  let account3 = accounts[2]

  before(async () => {
    let instance = await DAO.deployed();
    await instance.signup(inputName1, {from: account1});
  });

  it("should allow a member to propose a task", async () => {
    let instance = await DAO.deployed();
    await instance.propose('test title', 'test content', {from: account1});

    let taskCount = await instance.getTaskCount.call({from: account1});
    assert.equal(1, taskCount, "task count did not increase")
    
    let task = await instance.tasks.call(0)

    let proposerAddress = task.proposer
    let proposerName = task.name 
    let taskTitle = task.title
    let taskContent = task.content 
    let nonconsensus = task.nonconsensus
    let finished = task.finished 

    assert.equal(proposerAddress, account1, "proposer address does not match");
    assert.equal(proposerName, inputName1, "proposer name does not match");
    assert.equal(taskTitle, 'test title', "task title address does not match");
    assert.equal(taskContent, 'test content', "task content address does not match");
    assert.equal(nonconsensus, false, "consensus flag defaulted to true");
    assert.equal(finished, false, "finished flag defaulted to true");
  });

  it("should not allow a non-member to propose a task", async () => {
    let instance = await DAO.deployed();
    await expectThrow(instance.propose('test title', 'test content', {from: account2}));
  });

  it("should allow a member to vote on a task", async () => {
    let instance = await DAO.deployed();
    await instance.vote(0, true, {from: account1});

    let votedList = await instance.getVoted(0)
    assert.equal(votedList[0], account1, "voter address does not match")
  });

  it("should not allow voting on non-existing tasks", async () => {
    let instance = await DAO.deployed();
    await expectThrow(instance.vote(1, true, {from: account1}));
  });

  it("should not allow any member to vote more than once on the same task", async () => {
    let instance = await DAO.deployed();
    await expectThrow(instance.vote(0, true, {from: account1}));
  });

  it("should not allow any new member to vote on a finished task", async () => {
    
    before(async () => {
      let instance = await DAO.deployed();
      await instance.signup(inputName2, {from: account2});
    });

    let instance = await DAO.deployed();
    await expectThrow(instance.vote(0, true, {from: account2}));
  });

  it("should allow only the proposer of the task to remove the task", async () => {
    let instance = await DAO.deployed();
    await expectThrow(instance.remove(0, {from: account2}));
    await instance.remove(0, {from: account1});
  });

  it("should not allow any non-member to propose, vote, or access tasks", async () => {
    let instance = await DAO.deployed();
    await expectThrow(instance.propose('test title', 'test content', {from: account3}));
    await expectThrow(instance.vote(0, true, {from: account3}));
    await expectThrow(instance.remove(0, {from: account3}));
  });
  
});