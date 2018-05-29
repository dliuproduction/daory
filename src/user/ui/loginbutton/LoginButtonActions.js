import DAOContract from '../../../../build/contracts/DAO.json'
import { browserHistory } from 'react-router'
import store from '../../../store'

const contract = require('truffle-contract')

export const TASKS_RETRIEVED = 'TASKS_RETRIEVED'
export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function tasksRetrieved(tasks) {
return {
    type: TASKS_RETRIEVED,
    payload: tasks
  }
}
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser() {
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
          DAOInstance.login({from: coinbase})
          .then(function(userName) {
            // If no error, login user.
            dispatch(userLoggedIn({"name": userName}))

            // Used a manual redirect here as opposed to a wrapper.
            // This way, once logged in a user can still access the home page.
            var currentLocation = browserHistory.getCurrentLocation()

            if ('redirect' in currentLocation.query)
            {
              return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
            }

            // get the current task count
            DAOInstance.getTaskCount.call({from: coinbase})
            .then(function(count) {

              let tasks = []
              for(let i=0; i<count; i++){
                
                // get specific task and push to an array
                DAOInstance.tasks.call(i, {from: coinbase})
                .then(function(task) {
                  tasks.push(task)
                })
              }
              dispatch(tasksRetrieved(tasks))
              console.log('Tasks retrieved, count:' + count)
            })

            alert("Congratulations " + store.getState().user.data.name + "! If you're seeing this message, you've logged in with your address successfully.")
            return browserHistory.push('/taskboard')
          })
          .catch(function(result) {
            // If error, go to signup page.
            console.error('Wallet ' + coinbase + ' does not have an account!')

            return browserHistory.push('/signup')
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
