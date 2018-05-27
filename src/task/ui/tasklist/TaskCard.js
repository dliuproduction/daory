import React from 'react'
import { Card, CardActions, CardContent, CardHeader, Button } from '@material-ui/core'

function TaskCard() {
  return(
    <div>
    <Card>
      <CardHeader title="Task Title" />
      <CardContent>
        Task Content Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat.
      </CardContent>
      <CardActions>
        <Button>Yes</Button>
        <Button>No</Button>
      </CardActions>
    </Card>
    </div>
  )
}

export default TaskCard;