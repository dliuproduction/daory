import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Redux Store
import store from './store.js'

// Styles
// import './css/oswald.css'
// import './css/open-sans.css'
// import './css/pure-min.css'
import './App.css'
import 'typeface-roboto'


class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <div>
        <Button color="inherit" className="button">
          <Link to="/dashboard" style={{ textDecoration: 'none' , color: "inherit"}}>
              Dashboard
          </Link>
        </Button>
        <Button color="inherit" className="button">
          <Link to="/profile" style={{ textDecoration: 'none' , color: "inherit"}}>
              Profile
          </Link>
        </Button>
        <LogoutButtonContainer />
      </div>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <div>
        <Button color="inherit" className="button" href="/signup">
          Sign Up
        </Button>
        <LoginButtonContainer />
      </div>
    )

    const DetectWeb3 = () => {
      var web3 = store.getState().web3
      var returnMessage
      if (web3.web3Instance !== 'undefined') {
        returnMessage = 'Web3 Detected: ' + web3.network
      } else {
        returnMessage = 'Web3 Not Detected'
      }
      return (
        <div>
          <Typography variant="body2" color="inherit">
            {returnMessage}
          </Typography>
        </div>
      )
    }

    return (
      <div className="App">
          <AppBar position="static" color="primary">
            <Toolbar>
              <Button color="inherit" className="button">
                <Link to="/" style={{ textDecoration: 'none' , color: "inherit"}}>
                  <Typography variant="headline" color="inherit">
                    Daory
                  </Typography>
                </Link>
              </Button>
              <OnlyGuestLinks />
              <OnlyAuthLinks />
              <DetectWeb3 />
            </Toolbar>
          </AppBar>
        {this.props.children}
      </div>
    );
  }
}

export default App
