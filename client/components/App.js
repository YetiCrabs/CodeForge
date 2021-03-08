import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import LandingPage from './LandingPage.js';
import SignUpPage from './SignUpPage.js';
import Home from './Home.js'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: 'Username has not been set yet...',
      currentUserStatus: "inactive",
      currentUserStatusMessage: "",
    };

    this.ToggleButtonFunc = this.ToggleButtonFunc.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);

  }

  ToggleButtonFunc() {
    let status;
    if (this.state.currentUserStatus === "inactive") {
      status = "active";
    } else {
      status = "inactive";
    }
    this.setState({ ...this.state, currentUserStatus: status });
    localStorage.setItem('userStatus', status)
  }

  setCurrentUser(input) {
    alert(this.state.currentUsername);
    alert(input);
    this.setState({ ...this.state, currentUsername: input });
    alert(this.state.currentUsername);
    localStorage.setItem('username', input);
  }

  componentDidMount() {
    console.log('App mounted')
  }

  render() {
    return (
      <div>
      <div>Username: {this.state.currentUsername}</div>
        <Switch>
          <Route path="/signup">
            <SignUpPage setCurrentUser={this.setCurrentUser} />
          </Route>

          <Route path="/home">
            <Home
              ToggleButtonFunc={this.ToggleButtonFunc}
              currentUserStatus={this.state.currentUserStatus}
              currentUserStatusMessage={this.state.currentUserStatusMessage}
              currentUsername={this.state.currentUsername}
              setCurrentUser={this.setCurrentUser}
            />
          </Route>

          <Route path="/">
            <LandingPage setCurrentUser={this.setCurrentUser} />
          </Route>
        </Switch>
      </div>
    )
  }
}
