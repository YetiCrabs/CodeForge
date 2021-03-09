import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(event) {
    event.preventDefault();
    console.log('Form submitted\n', `username: ${event.target[0].value}, password: ${event.target[1].value}`);

    fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: event.target[0].value,
        password: event.target[1].value,
      })
    })
    .then(response => {
      this.props.setCurrentUser("Joe"); // fix this to pull actual username
      window.location.href = response.url;
    })

  }

  render() {
    return (
      <div id="loginDiv">
        <form id="loginForm" onSubmit={this.formSubmit}>
          <input className='inputField' name="username" type="text" value={this.state.username} placeholder="Username" />
          <input className='inputField' name="password" type="password" value={this.state.password} placeholder="Password" />
          <input className='btn' type="submit" value="Log In" />
        </form>
        <Link to="/signup">
          <button className='btn'>Sign Up</button>
        </Link>
      </div>
    )
  }
}

export default LandingPage;