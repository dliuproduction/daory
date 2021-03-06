import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, FormControl } from '@material-ui/core';

const styles = theme => ({
  container: {
    width: '12.5%',
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
  },
  button: {
    width: '100%',
    margin: theme.spacing.unit,
  },
  textField: {
    width: '100%',
    margin: theme.spacing.unit,
  }
});

class ProfileForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name
    }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2)
    {
      return alert('Please fill in your name.')
    }

    this.props.onProfileFormSubmit(this.state.name)
  }

  render() {
    const { classes } = this.props

    return(
      <form className={classes.container}>
        <FormControl fullWidth={true}>
          <TextField 
          className={classes.textField}
          id="name"
          label='Name'
          value={this.state.title} 
          placeholder="Vitalik Buterin"
          onChange={this.onInputChange.bind(this)} 
          />
          <Button variant='raised' color='primary' className={classes.button} onClick={this.handleSubmit.bind(this)}>
            Submit
          </Button>
        </FormControl>
      </form>
    )
  }
}

ProfileForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileForm)
