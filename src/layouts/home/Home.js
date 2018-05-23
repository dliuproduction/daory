import React, { Component } from 'react'
import { HiddenOnlyAuth, VisibleOnlyAuth } from '../../util/wrappers.js'
import HomeList from "./HomeList.js"

class Home extends Component {
  render() {

    const AuthHome = VisibleOnlyAuth(() =>
      <HomeList />
    )

    const GuestHome = HiddenOnlyAuth(() =>
        <h1>Please signup or login first.</h1>
    )

    return(
      <main className="container">
          <AuthHome />
          <GuestHome />
      </main>

    )
  }
}

export default Home
