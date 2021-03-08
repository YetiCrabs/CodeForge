import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    // this.formChange = this.formChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  // formChange(event) {
  //   const target = event.target;
  //   this.setState({ [target.name]: target.value });
  //   console.log('Form submitted\n', `username: ${this.state.username}, password: ${this.state.password}`);
  // }

  formSubmit(event) {
    event.preventDefault();
    console.log('Form submitted\n', `username: ${event.target[0].value}, password: ${event.target[1].value}`);

    fetch('/login', { // previously fetch('/login'
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
      // alert('try to pass in Joe');
      this.props.setCurrentUser("Joe"); // fix this to pull actual username
      window.location.href = response.url;
    })
    
  }

  render() {
    return (
      <div>
        <form onSubmit={this.formSubmit}>
          <input name="username" type="text" value={this.state.username} placeholder="Username" />
          <input name="password" type="password" value={this.state.password} placeholder="Password" />
          <input type="submit" value="Log In" />
        </form>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>
    )
  }


}

export default LandingPage;