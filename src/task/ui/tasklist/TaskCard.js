import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardContent, CardHeader, Collapse, Button } from '@material-ui/core'

function TaskCard() {
  return(
    <div>
    <Card>
      <CardHeader title="Task Title" />
      <CardActions>
        <Button>Yes</Button>
        <Button>No</Button>
      </CardActions>
      <CardContent>
        Task Content Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat.
      </CardContent>
    </Card>
    </div>
  )
}

export default TaskCard;