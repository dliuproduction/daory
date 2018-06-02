import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Web3 detection component
import Web3StatusContainer from './util/web3/web3status/Web3StatusContainer'

// Styles
import './App.css'
import 'typeface-roboto'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      web3: this.props.web3
    }
  }

  render() {
    const { classes } = this.props

    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <div>
        <Button variant='raised' color="primary" className={classes.button}>
          <Link to="/propose" style={{ textDecoration: 'none' , color: "inherit"}}>
              Propose
          </Link>
        </Button>

        <Button variant='raised' color="primary" className={classes.button}>
          <Link to="/profile" style={{ textDecoration: 'none' , color: "inherit"}}>
              Profile
          </Link>
        </Button>
        <LogoutButtonContainer />
      </div>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <div>
        <Button variant='raised' color="primary" className={classes.button}>
          <Link to="/signup" style={{ textDecoration: 'none' , color: "inherit"}}>
              Sign Up
          </Link>
        </Button>
        <LoginButtonContainer />
      </div>
    )

    return (
      <div className="App">
          <AppBar position="sticky" color="primary">
            <Toolbar>
              <Button variant='raised' color="primary" className={classes.button}>
                <Link to="/taskboard" style={{ textDecoration: 'none' , color: "inherit"}}>
                  <Typography variant="headline" color="inherit">
                    Task Board
                  </Typography>
                </Link>
              </Button>
              <OnlyGuestLinks />
              <OnlyAuthLinks />
              <Web3StatusContainer />
            </Toolbar>
          </AppBar>
        {this.props.children}
      </div>
      
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

