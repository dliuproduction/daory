const initialState = {
  web3Instance: null,
  network: null
}

const web3Reducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED') {
    return Object.assign({}, state, {
      web3Instance: action.payload.web3Instance,
      network: action.payload.network
    })
  } else if (action.type ==='WEB3_NOT_FOUND') {
    return Object.assign({}, state, {
      web3Instance: action.payload.web3Instance,
    })
  } else {
    return state
  }
}

export default web3Reducer
