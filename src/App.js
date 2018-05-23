import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import 'typeface-roboto'


class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <div>
        <Button color="inherit" classname="button" href="/dashboard">
          <Link to="/dashboard">
            Dashboard
          </Link>
        </Button>
        <Button color="inherit" classname="button">
          <Link to="/profile">
            Profile
          </Link>
        </Button>
        <LogoutButtonContainer />
      </div>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <div>
        <Button color="inherit" classname="button" href="/signup">
          Sign Up
        </Button>
        <LoginButtonContainer />
      </div>
    )

    return (
      <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" classname="button" href="/">
                <Typography variant="title" color="inherit" className="flex">
                  Daory
                </Typography>
              </Button>
              <OnlyGuestLinks />
              <OnlyAuthLinks />
            </Toolbar>
          </AppBar>
        {this.props.children}
      </div>
    );
  }
}

export default App
