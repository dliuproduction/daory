import DAOContract from '../../../../build/contracts/DAO.json'
import store from '../../../store'

const contract = require('truffle-contract')

export const TASK_PROPOSED = 'TASK_PROPOSED'
function taskProposed(task) {
  return {
    type: TASK_PROPOSED,
    payload: task
  }
}

export function proposeTask(title, content) {
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

        DAO.deployed().then(function(instance) {
          DAOInstance = instance

          // Attempt to propose task.
          DAOInstance.propose(title, content, {from: coinbase})
          .then(function(result) {
            // If no error, propose task
            return alert('Task Proposed!, transaction ID: ', result)
          })
          .catch(function(result) {
            // If error...
            return alert('Error! (' + result + ')')
          })

          DAOInstance.newTask().watch((err, res) => {
            
            dispatch(taskProposed(
              {
                  proposer: coinbase, // member who proposed the task 
                  title: title,       // task name
                  content: content,   // task detail
                  voteCount: 0,       // number of accumulated votes
                  nonconsensus: false, // bool to signal that someone voted no
                  finished: false     // bool to signal voting has finished
              }))
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}