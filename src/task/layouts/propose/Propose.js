import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import ProposeFormContainer from '../../ui/proposeform/ProposeFormContainer'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  }
});

class Propose extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <Typography variant="display2">
          Propose task
        </Typography>
        <Typography variant="subheading">
          Enter task title and content
        </Typography>
        <ProposeFormContainer />
      </div>
    )
  }
}

Propose.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Propose)