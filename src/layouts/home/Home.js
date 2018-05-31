import React, { Component } from 'react'
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../../util/wrappers.js'
import { Typography } from '@material-ui/core';

class Home extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {

    const AuthHome= VisibleOnlyAuth(() =>
      <Typography variant="display2">
        Congratulations! If you're seeing this message, you've logged in with your own smart contract successfully.
      </Typography>
    )

    const GuestHome = HiddenOnlyAuth(() =>
      <Typography variant="display2">Please signup or login first.</Typography>
    )

    return(
      <main className="container">
          {/* <AuthHome /> */}
          <GuestHome />
      </main>
    )
  }
}

export default Home
