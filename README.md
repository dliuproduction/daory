[![Edit daory](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/dliuproduction/daory/tree/develop/?autoresize=1)
# daory
### A simple decentralized autonomous organization

- Members can propose and vote on tasks. 
- Once a task gets 100% of votes then it becomes an approved task. 
- If a task does not get 100% votes after everyone has voted, then it becomes an unapproved task.

## Getting Started

These instructions will get you a a copy of the project running on your localhost with a development blockchain.

## Installation

1. Clone this repo
    ```bash
    git clone https://github.com/dliuproduction/daory.git
    ```
    
2. Install npm packages
    ```bash
    npm install
    npm update
    ```

3. Install Truffle globally.
    ```javascript
    npm install -g truffle
    ```
    
4. Run your local blockchain. eg. ganache-cli
    ```javascript
    ganache-cli
    ```
    
5. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    truffle compile
    truffle migrate
    ```

6. Run the webpack server for front-end hot reloading (outside the development console). Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // Serves the front-end on http://localhost:3000
    npm start
    ```

7. Import your ethereum account generated on the local test blockchain into MetaMask.
    
## Usage

1. Connect MetaMask to custom localhost RPC if web3 is not detected correctly. This information can be found in the truffle develop console (eg. http://127.0.0.1:8545/).

2. Click 'Sign Up' to sign up your address with a name. This is mandatory to login

3. Click 'Login' 

4. Click 'Propose' to propose tasks

5. Click 'Task Board' to view tasks and vote 

## Testing

Contract tests are written in javascript. To run tests:
    ```javascript
    truffle test
    ```

### Rationale for tests:

1. #### Authentication.js
    Tests the authentication process for normal use (signup, login, update names), and edge cases (disallow empty names, disallow non-member login)

2. #### DAO.js
    Test the functionalities of the DAO. Specifically:

    Normal use:
    1. Task proposal
    2. Task voting
    3. Task removal
   
    Edge cases:
    1. Disallow non-member to propose task
    2. Disallow non-member to vote on a task
    3. Disallow any member to vote on the same task more than once.
    4. Disallow any new members to vote on a task that has finished voting before their joining.
    5. Disallow members to remove tasks not proposed by themselves.
    6. Disallow any member to vote on a non-existing task

## Design Pattern

1. #### Emergency stop
    The Authentication contract which the DAO contract inherits from, is implemented as destructible.

2. #### Design patterns
    1. Restricting access
        - Tasks are declared public, therefore anyone can view the task list and the voting details.
        - However, all functions that change the state of the contracts (eg. propose, vote, remove), require a membership to be associated with the ethereum account.
        - Only proposers of the tasks can remove their own tasks
        - Only the contract creater/owner can destroy the contract
        - This pattern is used to implement the mechanics of voting in the organization, as a consensus of votes needs to be achieved amoung a certain number of members for a task to be approved. 
        - No payment pattern is used, as the contract does not have any functions that require transfers of value.

## Security tools / Common attacks

Openzeppelin libraries of destructible and SafeMath are used in the contracts. However, since there is no transfer of value within the contract, there is no incentive to gain for an attacker. 

### Possible attacks:

1. #### Integer overflow:
   The attacker could overflow the task count, making the organization's task count reset and unusable. However, this requires a very large number of transactions.

2. #### Forcibly sending ether to contract:
    The attacker could send ether to the contract. However, as there is no functionality associated with the balance of the contract, the Ether would be stuck in the contract.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/dliuproduction/daory/blob/master/LICENSE) file for details
