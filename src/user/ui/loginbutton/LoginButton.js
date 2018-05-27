import React from 'react';
import Button from '@material-ui/core/Button';

const LoginButton = ({ onLoginUserClick }) => {
  return(
    <Button variant='raised' color="primary" href="#" onClick={(event) => onLoginUserClick(event)}>
      Login
    </Button>
  )
}

export default LoginButton
