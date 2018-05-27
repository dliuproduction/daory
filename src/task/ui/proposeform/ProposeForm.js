import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, FormControl } from '@material-ui/core';

const styles = theme => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

class ProposeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      content: ''
    }
  }
  
  onInputChange(event) {

    this.setState({ [event.target.id]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.title.length < 2) {
      return alert('Please fill in the task title.')
    } else if (this.state.content.length < 2) {
      return alert('Please fill in the task content.')
    }

    this.props.onProposeFormSubmit(this.state.title, this.state.content)
  }

  render() {
    const { classes } = this.props

    return(
      <form className={classes.container}>
        <FormControl>
          <TextField 
          className={classes.textField}
          id="title"
          label='Title'
          value={this.state.title} 
          placeholder="Moon Mission"
          onChange={this.onInputChange.bind(this)} 
          />
          <TextField 
          className={classes.textField}
          id="content"
          label='Content'
          value={this.state.content} 
          placeholder="Go to the moon in 2018"
          multiline
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

ProposeForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProposeForm)