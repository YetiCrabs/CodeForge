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
    event.preventDefault();
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
      console.log('inside formsubmit on signup page', response.url)
      this.props.setCurrentUser("Joe") // fix this to send actual username
      window.location.href = '../home';
    })
  }

  render() {
    return (
      <div id="signUpDiv">
        <form id="signUpForm" onSubmit={this.formSubmit}>
          <input className='inputField' name="username" type="text" value={this.state.username} onChange={this.formChange} placeholder="Username" />
          <input className='inputField' name="password" type="password" value={this.state.password} onChange={this.formChange} placeholder="Password" />
          <input className='btn' type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }


}

export default SignUpPage;