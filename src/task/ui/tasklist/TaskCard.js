import React from 'react'
import { Card, CardActions, CardContent, CardHeader, Button, Typography } from '@material-ui/core'

const TaskCard = ( {proposer, title, content, voteCount, nonconsensus, finished} ) => {
  return(
    <div>
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
          <Button>Yes</Button>
          <Button>No</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default TaskCard;