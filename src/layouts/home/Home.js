import React, { Component } from 'react'
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../../util/wrappers.js'
import TaskListContainer from "../../task/ui/tasklist/TaskListContainer.js"
import { Typography } from '@material-ui/core';

class Home extends Component {
  render() {

    const AuthHome = VisibleOnlyAuth(() =>
      <TaskListContainer />
    )

    const GuestHome = HiddenOnlyAuth(() =>
      <Typography variant="display2">Please signup or login first.</Typography>
    )

    return(
      <main className="container">
          <AuthHome />
          <GuestHome />
      </main>

    )
  }
}

export default Home
