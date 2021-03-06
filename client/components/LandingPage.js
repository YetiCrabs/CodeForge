// import { application } from 'express';
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }

    this.formChange = this.FormChange.bind(this);
    this.formSubmit = this.FormSubmit.bind(this);
  }

  formChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  formSubmit(event) {
    console.log('Form submitted\n', `username: ${this.state.username}, password: ${this.state.password}`);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.formSubmit}>
          <input name="username" type="text" value={this.state.username} onChange={this.formChange} placeholder="Username" />
          <input name="password" type="text" value={this.state.password} onChange={this.formChange} placeholder="Password" />
        </form>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    )
  }


}

export default LandingPage;