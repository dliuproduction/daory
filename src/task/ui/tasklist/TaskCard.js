import React from 'react'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core'

const TaskCard = ( {proposer, title, content, voteCount, nonconsensus, finished} ) => {
  return(
      <Card>
        <CardContent>
          <Typography variant='headline'>
            {title}
          </Typography>
          <Typography variant='subheading'>
            {proposer}
          </Typography>
          <Typography variant='body2'>
            {content}
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