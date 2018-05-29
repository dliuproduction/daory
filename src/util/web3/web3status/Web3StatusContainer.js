import { connect } from 'react-redux'
import Web3Status from './Web3Status'
import { getWeb3 } from './Web3StatusActions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3.web3Instance,
    network: state.web3.network
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    detectWeb3: (event) => {
      event.preventDefault();

      dispatch(getWeb3())
    }
  }
}

const Web3StatusContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Web3Status)

export default Web3StatusContainer
