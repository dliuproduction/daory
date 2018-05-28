import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import ProfileFormContainer from '../../ui/profileform/ProfileFormContainer'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  }
});

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <Typography variant="display2">
          Profile
        </Typography>
        <Typography variant="subheading">
          Change your name here
        </Typography>
        <ProfileFormContainer />
      </div>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Profile)