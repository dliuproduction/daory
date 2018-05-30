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
            return alert('Task proposed, mining transaction!')
          })
          .catch(function(result) {
            // If error...
            return alert('Error proposing task')
          })

          DAOInstance.newTask().watch((err, res) => {
            alert('new task proposal event')
            dispatch(taskProposed(
              {
                  proposer: res.proposer, // member who proposed the task 
                  name: res.name,
                  title: res.title,       // task name
                  content: res.content,   // task detail
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