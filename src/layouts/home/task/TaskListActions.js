import AuthenticationContract from '../../../../build/contracts/Authentication.json'
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

          // Attempt to login user.
          DAOInstance.propose(title, content, {from: coinbase})
          .then(function(result) {
            // If no error, update user.

            dispatch(taskProposed({'title': title, 'content': content}))

            return alert('Task Proposed!')
          })
          .catch(function(result) {
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }

  cryptoZombies.events.NewZombie()
  .on("data", function(event) {
    let zombie = event.returnValues;
    // We can access this event's 3 return values on the `event.returnValues` object:
    console.log("A new zombie was born!", zombie.zombieId, zombie.name, zombie.dna);
  }).on("error", console.error);
}