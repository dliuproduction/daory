import React, { Component } from 'react'

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

    if (this.state.title.length < 2)
    {
      return alert('Please fill in your name.')
    }

    this.props.onProposeFormSubmit(this.state.title, this.state.content)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Title</label>
          <input id="title" type="text" value={this.state.title} onChange={this.onInputChange.bind(this)} placeholder="Moon Mission" />
          <label htmlFor="content">Content</label>
          <input id="content" type="text" value={this.state.content} onChange={this.onInputChange.bind(this)} placeholder="Go to the moon in 2018" />

          <br />

          <button type="submit" className="pure-button pure-button-primary">Submit</button>
        </fieldset>
      </form>
    )
  }
}

export default ProposeForm