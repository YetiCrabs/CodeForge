import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import LandingPage from './LandingPage.js';
import SignUpPage from './SignUpPage.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/signup">
            <SignUpPage />
          </Route>

          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    )
  }
}
