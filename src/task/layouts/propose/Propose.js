import React, { Component } from 'react'
import ProposeFormContainer from '../../ui/proposeform/ProposeFormContainer'

class Propose extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Propose</h1>
            <p>Enter task title and content</p>
            <ProposeFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Propose