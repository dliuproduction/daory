import React from 'react'
import Button from '@material-ui/core/Button';

const LoginButton = ({ onLoginUserClick }) => {
  return(
    <li className="pure-menu-item">
      <a href="#" className="pure-menu-link" onClick={(event) => onLoginUserClick(event)}>
      <Button variant="raised" color="primary">Login</Button>
      </a>
    </li>
  )
}

export default LoginButton
