import React, { Component } from 'react'
import { Typography } from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: green[300] },
    secondary: { main: red[300] }
  },
});

class Web3Status extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      web3Instance: this.props.web3Instance,
      network: this.props.network
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.network !== this.props.network) 
    || (prevState.web3Instance !== this.props.web3Instance)) {
      this.setState ({
        web3Instance: this.props.web3Instance,
        network: this.props.network
      }, function() {
        console.log(
          'web3 updated ', this.props.network)
      }) 
    }
  }

  render() {

    let web3msg = this.state.network == null ? 
    <Typography variant="body2" color="secondary" align='right'> 
      Web3 not detected
    </Typography> 
    : <Typography variant="body2" color="primary" align='right'> 
      Web3 detected:  {this.state.network}
    </Typography> 

    return (
      <MuiThemeProvider theme={theme}>
        {web3msg}
      </MuiThemeProvider>
    )
  }
}

export default Web3Status

