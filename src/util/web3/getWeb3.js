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

function getNetwork(web3) {
    switch (web3.version.network) {
      case "1":
        return('Mainnet')
      case "2":
        return('Morden Testnet')
      case "3":
        return('Ropsten Testnet')
      case "4":
        return('Rinkeby Testnet')
      case "42":
        return('Kovan Testnet')
      default:
        return('Unknown Network ID: ' + web3.version.network)
    }
}

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function(dispatch) {
    var results
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.

      web3 = new Web3(web3.currentProvider)
      var network = getNetwork(web3)

      console.log('Injected web3 detected: ' + network)

      results = {
        web3Instance: web3,
        network: network
      }


      resolve(store.dispatch(web3Initialized(results)))
    } else {

      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      // var provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545')

      // web3 = new Web3(provider)

      results = {
        web3Instance: 'undefined'      
      }

      console.log('No web3 instance injected, install Metamask to proceed');

      resolve(store.dispatch(web3NotFound(results)))
    }
  })
})

export default getWeb3
