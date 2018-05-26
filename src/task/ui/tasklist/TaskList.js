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
  state = { open: true };

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
    );
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskList);
