import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import getWeb3 from './util/web3/getWeb3'

// Material-UI styling
import CssBaseline from '@material-ui/core/CssBaseline';

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import TaskBoard from './layouts/taskboard/TaskBoard'
import SignUp from './user/layouts/signup/SignUp'
import Profile from './user/layouts/profile/Profile'
import Propose from './task/layouts/propose/Propose'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

// Initialize web3 and set in Redux, then pass to App to load in first mounting of component.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
})


ReactDOM.render((
  <div>
    <CssBaseline />
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="taskboard" component={UserIsAuthenticated(TaskBoard)} />
          <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="propose" component={UserIsAuthenticated(Propose)} />
        </Route>
      </Router>
    </Provider>
  </div>
  ),
  document.getElementById('root')
)
