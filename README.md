
# daory
### A simple decentralized autonomous organization

- Members can propose and vote on tasks. 
- Once a task gets 100% of votes then it becomes an approved task. 
- If a task does not get 100% votes after everyone has voted, then it becomes an unapproved task.

## Getting Started

These instructions will get you a a copy of the project running on your localhost with a development blockchain.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

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
    
4. Run the development console.
    ```javascript
    truffle develop
    ```

5. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

6. Run the webpack server for front-end hot reloading (outside the development console). Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // Serves the front-end on http://localhost:3000
    npm start
    ```

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/dliuproduction/daory/blob/master/LICENSE) file for details
