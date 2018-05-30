import React from 'react'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core'

const TaskCard = ( {proposer, name, title, content, voteCount, nonconsensus, finished} ) => {
  return(
      <Card>
        <CardContent>
          <Typography variant='headline'>
            Title: {title}
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
          <Button variant='raised'>Yes</Button>
          <Button variant='raised'>No</Button>
        </CardActions>
      </Card>
  )
}

export default TaskCard;