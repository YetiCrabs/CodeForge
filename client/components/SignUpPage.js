import React, { Component } from 'react';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }

    this.formChange = this.formChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  formChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  formSubmit(event) {
    console.log('Form submitted\n', `username: ${this.state.username}, password: ${this.state.password}`);

    fetch('/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then(response => {
      console.log('inside formsubmit on signup page')
      window.location.href = response.url
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.formSubmit}>
          <input name="username" type="text" value={this.state.username} onChange={this.formChange} placeholder="Username" />
          <input name="password" type="password" value={this.state.password} onChange={this.formChange} placeholder="Password" />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }


}

export default SignUpPage;