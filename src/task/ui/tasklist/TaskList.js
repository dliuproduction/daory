import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List , ListSubheader, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { CheckBoxOutlineBlank, CheckBox, IndeterminateCheckBox, ExpandLess, ExpandMore } from '@material-ui/icons';
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
      open: true,
      tasks: this.props.tasks
      // tasks: [{
      //   proposer: '', // member who proposed the task 
      //   title: 'test1', // task name
      //   content: '', // task detail
      //   voteCount: 0, // number of accumulated votes
      //   nonconsensus: false, // bool to signal that someone voted no
      //   finished: false // bool to signal voting has finished
      // },{
      //   proposer: '', // member who proposed the task 
      //   title: 'test2', // task name
      //   content: '', // task detail
      //   voteCount: 0, // number of accumulated votes
      //   nonconsensus: false, // bool to signal that someone voted no
      //   finished: false // bool to signal voting has finished
      // }]
    }
  }

  updateTasks = () => {
    var taskList = []
    for(let i=0; i<this.state.tasks.length; i++){ 
      taskList.push(TaskCard( this.state.tasks[i] ))
    }

    return <div>{taskList}</div>
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
        >
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <CheckBoxOutlineBlank />
            </ListItemIcon>
            <ListItemText inset primary="Proposed" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.updateTasks()}
            </List>
          </Collapse>

          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <CheckBox />
            </ListItemIcon>
            <ListItemText inset primary="Approved" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <TaskCard />
              </ListItem>
              <ListItem>
                <TaskCard />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <IndeterminateCheckBox />
            </ListItemIcon>
            <ListItemText inset primary="Disapproved" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <TaskCard />
              </ListItem>
              <ListItem>
                <TaskCard />
              </ListItem>
            </List>
          </Collapse>

        </List>
      </div>
    )
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TaskList)
