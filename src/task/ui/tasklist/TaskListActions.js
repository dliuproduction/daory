import DAOContract from '../../../../build/contracts/DAO.json'
import store from '../../../store'

const contract = require('truffle-contract')

export const TASKS_RETRIEVED = 'TASKS_RETRIEVED'
function tasksRetrieved(tasks) {
return {
    type: TASKS_RETRIEVED,
    payload: tasks
  }
}

export const TASK_PROPOSED = 'TASK_PROPOSED'
function taskProposed(task) {
  return {
    type: TASK_PROPOSED,
    payload: task
  }
}

export function watchTasks() {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the DAO object.
      const DAO = contract(DAOContract)
      DAO.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on DAO.
      var DAOInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        DAO.deployed()
        .then(function(instance) {
          DAOInstance = instance

          
        })
        .catch(function(result) {
          console.log('DAO not deployed')
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}

export function retrieveTasks() {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the DAO object.
      const DAO = contract(DAOContract)
      DAO.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on DAO.
      var DAOInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        DAO.deployed()
        .then(function(instance) {
          DAOInstance = instance

          // get the current task count
          DAOInstance.getTaskCount.call({from: coinbase})
          .then(function(count) {

            console.log("task count: " + count)

            let tasks = []
            for(let i=0; i<count; i++){
              
              // get specific task and push to an array
              DAOInstance.tasks.call(i, {from: coinbase})
              .then(function(res) {
                let task = {
                  proposer: res[0], // member who proposed the task 
                  name: res[1],
                  title: res[2],       // task name
                  content: res[3],   // task detail
                  voteCount: res[4].toNumber(),       // number of accumulated votes
                  nonconsensus: res[5], // bool to signal that someone voted no
                  finished: res[6]     // bool to signal voting has finished
                }
                tasks.push(task)
              })
              .catch(function(err) {
                alert('failed to get tasks: ' + err)
              })
            }
              dispatch(tasksRetrieved(tasks))
              alert('Tasks retrieved')
          })

          DAOInstance.newTask().watch((err, res) => {
            if (!err) {
              
              DAOInstance.getTaskCount.call({from: coinbase})
              .then(function(count) {

                console.log("task count: " + count)

                let tasks = []
                for(let i=0; i<count; i++){
                  
                  // get specific task and push to an array
                  DAOInstance.tasks.call(i, {from: coinbase})
                  .then(function(res) {
                    let task = {
                      proposer: res[0], // member who proposed the task 
                      name: res[1],
                      title: res[2],       // task name
                      content: res[3],   // task detail
                      voteCount: res[4].toNumber(),       // number of accumulated votes
                      nonconsensus: res[5], // bool to signal that someone voted no
                      finished: res[6]     // bool to signal voting has finished
                    }
                    tasks.push(task)
                  })
                  .catch(function(err) {
                    alert('failed to get tasks: ' + err)
                  })
                }
                  dispatch(tasksRetrieved(tasks))
                  alert('New tasks retrieved')
              })
            }
          })

        })
        .catch(function(result) {
          console.log('DAO not deployed')
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}