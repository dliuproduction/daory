import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { List , ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { CheckBoxOutlineBlank, CheckBox, IndeterminateCheckBox } from '@material-ui/icons';

const styles = theme => ({
  root: {
    width: '50%',
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
  }
});

class TaskList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      proposedList: this.props.proposedList,
      approvedList: this.props.approvedList,
      disapprovedList: this.props.disapprovedList
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.proposedList.length !== this.props.proposedList.length) {
      this.setState ({
        proposedList: this.props.proposedList
      }, function() {
        console.log(
          '\nproposed tasks updated in taskList state: ', this.state.proposedList,
        )
      }) 
    } else if (prevState.approvedList.length !== this.props.approvedList.length) {
      this.setState ({
        approvedList: this.props.approvedList
      }, function() {
        console.log(
          '\napproved tasks updated in taskList state: ', this.state.approvedList,
        )
      })
    } else if (prevState.disapprovedList.length !== this.props.disapprovedList.length) {
      this.setState ({
        disapprovedList: this.props.disapprovedList
      }, function() {
        console.log(
          '\ndisapproved tasks updated in taskList state: ', this.state.disapprovedList,
        )
      })
    }
  }

  componentDidMount() {
    this.props.getTasks(event)
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant='display2' align='center'>
          List of tasks
        </Typography>
        <List component="div" disablePadding>
          <ListItem>
            <ListItemIcon>
              <CheckBoxOutlineBlank/>
            </ListItemIcon>
            <ListItemText inset primary="Proposed" />
          </ListItem>
          {this.state.proposedList}
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
