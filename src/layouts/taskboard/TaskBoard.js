import React, { Component } from 'react'
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../../util/wrappers.js'
import TaskListContainer from "../../task/ui/tasklist/TaskListContainer.js"
import { Typography } from '@material-ui/core';

class Taskboard extends Component {
  render() {

    const AuthTaskboard = VisibleOnlyAuth(() =>
      <TaskListContainer />
    )

    const GuestTaskboard = HiddenOnlyAuth(() =>
      <Typography variant="display2">Please signup or login first.</Typography>
    )

    return(
      <main className="container">
          <AuthTaskboard />
          <GuestTaskboard />
      </main>

    )
  }
}

export default Taskboard

