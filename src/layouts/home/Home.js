import React, { Component } from 'react'
import { HiddenOnlyAuth } from '../../util/wrappers.js'
import { Typography } from '@material-ui/core';

class Home extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {

    const GuestHome = HiddenOnlyAuth(() =>
      <Typography variant="display2" align='center'>Please signup or login first.</Typography>
    )

    return(
      <main className="container">
          <GuestHome />
      </main>
    )
  }
}

export default Home
