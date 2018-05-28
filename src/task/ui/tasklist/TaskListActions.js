import DAOContract from '../../../../build/contracts/DAO.json'
import store from '../../../store'

const contract = require('truffle-contract')

export const TASKS_RETRIVED = 'TASKS_RETRIVED'
function tasksRetrived(tasks) {
return {
    type: TASKS_RETRIVED,
    payload: tasks
  }
}

export function getTasks() {
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
          DAOInstance.getTaskCount.call()({from: coinbase})
          .then(function(count) {

            console.log("task count: " + count)

            let tasks = []
            
            DAOInstance.tasks.call()
            dispatch(tasksRetrived())
            
            return alert('Tasks retrieved')
          })
          .catch(function(result) {
            // If error...
            return alert('Error! (' + result + ')')
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