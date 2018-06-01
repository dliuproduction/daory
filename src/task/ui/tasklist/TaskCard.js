import React from 'react'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core'

const TaskCard = ( {taskId, proposer, name, title, content, voteCount, nonconsensus, finished }, vote ) => {
  return(
      <Card>
        <CardContent>
          <Typography variant='headline'>
            Title: {title}
          </Typography>
          <Typography variant='subheading'>
            Task #{taskId}
          </Typography>
          <Typography variant='subheading'>
            Proposer Name: {name} 
          </Typography>
          <Typography variant='subheading'>
            Proposer Address: {proposer} 
          </Typography>
          <Typography variant='body2'>
            Content: {content}
          </Typography>
          <Typography variant='body2'>
            Vote Count: {voteCount}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant='raised' onClick={vote(taskId, true)}>Yes</Button>
          <Button variant='raised' onClick={vote(taskId, false)}>No</Button>
        </CardActions>
      </Card>
  )
}

export default TaskCard;