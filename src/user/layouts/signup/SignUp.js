import React, { Component } from 'react'
import { Typography } from '@material-ui/core'
import SignUpFormContainer from '../../ui/signupform/SignUpFormContainer'

class SignUp extends Component {
  render() {
    return(
      <div>
        <Typography variant='display2'>
          Sign Up
        </Typography>
        <Typography variant='subheading'>
          We've got your wallet information, simply input your name and your account is made!
        </Typography>
        <SignUpFormContainer />
      </div>
    )
  }
}

export default SignUp
