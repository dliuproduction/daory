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
      tasks: this.props.tasks
    }
  }

  // componentDidMount() {
  //   this.props.getTasks(event)
  // }

  updateTasks = () => {
    var proposedList = [],
    approvedList = [],
    disapprovedList = []
    for(let i=0; i<this.state.tasks.length; i++){ 
      let task = this.state.tasks[i]
      if (!task.finished) {
        proposedList.push(<ListItem key={i.toString()}>{TaskCard(task)}</ListItem>)
      } else if (!task.nonconsensus) {
        approvedList.push(<ListItem key={i.toString()}>{TaskCard(task)}</ListItem>)
      } else {
        disapprovedList.push(<ListItem key={i.toString()}>{TaskCard(task)}</ListItem>)
      }
    }
    return (
      <div>
        <List component="div" disablePadding>
          <ListItem>
            <ListItemIcon>
              <CheckBoxOutlineBlank/>
            </ListItemIcon>
            <ListItemText inset primary="Proposed" />
          </ListItem>
          {proposedList}
        </List>

        <List component="div" disablePadding>
          <ListItem>
            <ListItemIcon>
              <CheckBox />
            </ListItemIcon>
            <ListItemText inset primary="Approved" />
          </ListItem>
          {approvedList}
        </List>

        <List component="div" disablePadding>
          <ListItem>
            <ListItemIcon>
              <IndeterminateCheckBox />
            </ListItemIcon>
            <ListItemText inset primary="Disapproved" />
          </ListItem>
          {disapprovedList}
        </List>
      </div>
    )
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
          <Typography variant='display2'>
            List of tasks
          </Typography>
            {this.updateTasks()}
      </div>
    )
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TaskList)
