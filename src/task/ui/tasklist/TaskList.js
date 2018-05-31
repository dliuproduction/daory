import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List , ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { CheckBoxOutlineBlank, CheckBox, IndeterminateCheckBox } from '@material-ui/icons';
import TaskCard from './TaskCard.js'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  }
});

class TaskList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tasks: this.props.tasks,
      proposedList: [],
      approvedList: [],
      disapprovedList: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tasks.length !== this.props.tasks.length) {
      this.setState ({
        tasks: this.props.tasks
      })
      console.log('tasks in taskList state: ')
      console.log(this.state.tasks)

      for(let i=0; i<this.state.tasks.length; i++){ 
        let task = this.state.tasks[i]
        let taskCard = <ListItem key={i.toString()}>{TaskCard(task)}</ListItem>
        console.log(task)
        if (!task.finished) {
          this.setState({
            proposedList: [...this.state.proposedList, task]
          })
          console.log(this.state.proposedList)
        } else if (!task.nonconsensus) {
          this.setState({
            approvedList: [...this.state.approvedList, taskCard]
          })
        } else {
          this.setState({
            disapprovedList: [...this.state.disapprovedList, taskCard]
          })
        }
      }
      console.log(this.state.proposedList)
    }
  }

  componentDidMount() {
    this.props.getTasks(event)
    this.setState ({
      tasks: this.props.tasks
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant='display2'>
          List of tasks
        </Typography>
        <List component="div" disablePadding>
          <ListItem>
            <ListItemIcon>
              <CheckBoxOutlineBlank/>
            </ListItemIcon>
            <ListItemText inset primary="Proposed" />
          </ListItem>
          {/* {this.state.proposedList} */}
          {console.log('tasks in render: ', this.state.tasks)}
        </List>

        <List component="div" disablePadding>
          <ListItem>
            <ListItemIcon>
              <CheckBox />
            </ListItemIcon>
            <ListItemText inset primary="Approved" />
          </ListItem>
          {this.state.approvedList}
        </List>

        <List component="div" disablePadding>
          <ListItem>
            <ListItemIcon>
              <IndeterminateCheckBox />
            </ListItemIcon>
            <ListItemText inset primary="Disapproved" />
          </ListItem>
          {this.state.disapprovedList}
        </List>
      </div>
    )
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TaskList)
