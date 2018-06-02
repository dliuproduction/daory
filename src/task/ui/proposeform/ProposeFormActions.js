import DAOContract from '../../../../build/contracts/DAO.json'
import store from '../../../store'

const contract = require('truffle-contract')

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
            return alert('Task proposed, wait for transaction!')
          })
          .catch(function(result) {
            // If error...
            return alert('Error proposing task')
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}