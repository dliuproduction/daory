import React, { Component } from 'react'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core'
import { red, green } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: green[100] },
    secondary: { main: red[100] }
  },
});

class TaskCard extends Component {

  constructor(props) {
    super(props)

    this.handleClickNo = this.handleClickNo.bind(this)
    this.handleClickYes = this.handleClickYes.bind(this)
    this.state = {
      task: this.props.task,
      voted: this.props.voted,
      yes: 'primary',
      no: 'secondary',
      disabled: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.voted !== this.props.voted) {
      console.log('votes changed')
      this.setState ({
        voted: this.props.voted
      })
      if(this.props.voted === 1) {
        this.setState ({
          no: 'default',
          disabled: true
        })
      } else if (this.props.voted === 2) {
        this.setState ({
          yes: 'default',
          disabled: true
        })
      }
    }
  }
  
  componentDidMount() {
    if(this.state.voted === 1) {
      this.setState ({
        no: 'default',
        disabled: true
      })
    } else if (this.state.voted === 2) {
      this.setState ({
        yes: 'default',
        disabled: true
      })
    }
  }

  handleClickYes = (event) => {

    this.props.vote(this.state.task.taskId, true);
    this.setState({
      disabled: true
    });
  }

  handleClickNo = (event) => {

    this.props.vote(this.state.task.taskId, false);
    this.setState({
      disabled: true
    });
  }

  render() {

    return(
      <MuiThemeProvider theme={theme}>
        <Card>
          <CardContent>
            <Typography variant='headline'>
              Title: {this.state.task.title}
            </Typography>
            <Typography variant='subheading'>
              Task #{this.state.task.taskId}
            </Typography>
            <Typography variant='subheading'>
              Proposer Name: {this.state.task.name} 
            </Typography>
            <Typography variant='subheading'>
              Proposer Address: {this.state.task.proposer} 
            </Typography>
            <Typography variant='body2'>
              Content: {this.state.task.content}
            </Typography>
            <Typography variant='body2'>
              Vote Count: {this.state.task.voteCount}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant='raised' color={this.state.yes} disabled={this.state.disabled} onClick={this.props.vote(this.state.task.taskId, true)}>Yes</Button>
            <Button variant='raised' color={this.state.no} disabled={this.state.disabled} onClick={this.props.vote(this.state.task.taskId, false)}>No</Button>
          </CardActions>
        </Card>
      </MuiThemeProvider>
    )
  }
}

export default TaskCard;