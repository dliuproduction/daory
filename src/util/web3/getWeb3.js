import store from '../../store'
import Web3 from 'web3'

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'
export const WEB3_NOT_FOUND = 'WEB3_NOT_FOUND'
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  }
}

function web3NotFound(results) {
  return {
    type: WEB3_NOT_FOUND,
    payload: results
  }
}

// const getNetwork = (web3) => {
//   web3.version.getNetwork((err, netId) => {
//     console.log(err, netId)
//     switch (netId) {
//       case "1":
//         network = 'Mainnet')
//       case "2":
//         network = 'Morden Testnet')
//       case "3":
//         network = 'Ropsten Testnet')
//       case "4":
//         network = 'Rinkeby Testnet')
//       case "42":
//         network = 'Kovan Testnet')
//       default:
//         network = 'Unknown Network ID: ' + netId)
//     }
//     // switch (web3.version.network) {
//     //   case "1":
//     //     network = 'Mainnet')
//     //   case "2":
//     //     network = 'Morden Testnet')
//     //   case "3":
//     //     network = 'Ropsten Testnet')
//     //   case "4":
//     //     network = 'Rinkeby Testnet')
//     //   case "42":
//     //     network = 'Kovan Testnet')
//     //   default:
//     //     network = 'Unknown Network ID: ' + web3.version.network)
//     // }
//   })
// }

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function(dispatch) {
    var results
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.

      web3 = new Web3(web3.currentProvider)

      // Determine the network connected according to network Id
      web3.version.getNetwork(
        function(err, netId) { 
        var network
        switch (netId) {
          case "1":
            network = 'Mainnet' 
            break
          case "2":
            network = 'Morden Testnet'
            break
          case "3":
            network = 'Ropsten Testnet'
            break
          case "4":
            network = 'Rinkeby Testnet'
            break
          case "42":
            network = 'Kovan Testnet'
            break
          default:
            network = 'Unknown Network ID: ' + netId
            break
        }
        results = {
          web3Instance: web3,
          network: network 
        }
        console.log('web3 detected, network: ' + network)
        resolve(store.dispatch(web3Initialized(results)))
      })
    } else {

      results = {
        web3Instance: 'undefined'      
      }

      console.log('No web3 instance injected, install Metamask to proceed');

      reject(store.dispatch(web3NotFound(results)))
    }
  })
})

export default getWeb3
