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
      currentUserStatus: false,
      currentUserStatusMessage: "",
    };

    this.ToggleButtonFunc = this.ToggleButtonFunc.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);

  }

  ToggleButtonFunc() {
    let status;
    if (!this.state.currentUserStatus) {
      status = true;
    } else {
      status = false;
    }
    this.setState({ ...this.state, currentUserStatus: status });
  }

  setCurrentUser(input) {
    this.setState({ ...this.state, currentUsername: input });
    localStorage.setItem('username', input);
  }

  componentDidMount() {
    console.log('App mounted')
  }

  render() {
    return (
      <div id="outerDiv">
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
