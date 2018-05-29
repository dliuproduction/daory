import React, { Component } from 'react'
import { Typography } from '@material-ui/core';

class Web3Status extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      web3Instance: this.props.web3Instance,
      network: this.props.network
    }
  }

  componentDidMount() {
    this.props.detectWeb3(event)
  }

  render() {
    if (typeof this.state.web3Instance !== 'undefined') {
      return (
        <div>
          <Typography variant="body2" color="inherit">
          Web3 Detected: {this.state.network}
          </Typography>
        </div>
      )
    } else {
      return (
        <div>
          <Typography variant="body2" color="error">
          'Web3 Not Detected'
          </Typography>
        </div>
      )
    }
  }
}

export default Web3Status

