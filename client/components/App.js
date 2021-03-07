import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import LandingPage from './LandingPage.js';
import SignUpPage from './SignUpPage.js';
import Home from './Home.js'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('App mounted')
    
    fetch('/users')
    .then(response => response.json())
    .then(users => {
      this.setState({...this.state, activeUsers: users.filter(user => user.status), inactiveUsers: users.filter(user => !user.status)});
      console.log(this.state);
    })
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/signup">
            <SignUpPage />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    )
  }
}
