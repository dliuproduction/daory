var Authentication = artifacts.require("Authentication");

contract('Authentication', async (accounts) => {
  let expectThrow = require("openzeppelin-solidity/test/helpers/expectThrow.js").expectThrow
  let inputName1 = 'Alice';
  let inputName2 = 'Bob';
  let emptyName = '';
  let account1 = accounts[0]
  let account2 = accounts[1]
  let account3 = accounts[2]

  it("should allow new users to sign up by recording their names", async () => {
    let instance = await Authentication.deployed();
    await instance.signup(inputName1, {from: account1});
    let memberName1 = await instance.members.call(account1)
    assert.equal(inputName1, memberName1, "Name wasn't recorded correctly");
  });

  it("should allow users to update their names", async () => {
    let instance = await Authentication.deployed();
    await instance.update(inputName2, {from: account1});
    let memberName2 = await instance.members.call(account1)
    assert.equal(inputName2, memberName2, "Name wasn't updated correctly");
  });

  it("should detect signups with empty names and throw an error", async () => {
    let instance = await Authentication.deployed();
    await expectThrow(instance.signup(emptyName, {from: account2}));
  });

  it("should detect updates with empty names and throw an error", async () => {
    let instance = await Authentication.deployed();
    await expectThrow(instance.update(emptyName, {from: account1}));
  });

  it("should allow existing members to login", async () => {
    let instance = await Authentication.deployed();
    let loginName = await instance.login.call({from: account1})
    assert.equal(inputName2, loginName, "Logged in user returned the wrong name")
  });

  it("should not allow non-existing members to login and throw an error", async () => {
    let instance = await Authentication.deployed();
    await expectThrow(instance.login({from: account3}))
  });
});