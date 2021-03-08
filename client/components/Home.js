import React, { Component } from 'react';
import FeedBubble from './FeedBubble.js'
import OfflineBubble from './OfflineBubble.js'
import NavBar from './NavBar.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUsers: [],
      inactiveUsers: [],

    };
    
    this.handleClick = this.handleClick.bind(this);
  }



  componentDidMount() {
    console.log('Home page did mount')
    console.log('Home Page Current username state from app', this.props.currentUsername)
    fetch('/users')
      .then(response => response.json())
      .then(users => {
        this.setState({ ...this.state, activeUsers: users.filter(user => user.status), inactiveUsers: users.filter(user => !user.status) });
        console.log(this.state);
      })
  }

  handleClick(){
    alert('username to joe button clicked');
    this.props.setCurrentUser("Joe");
  }

  render() {
    const bubbles = [];
    if (this.state.activeUsers.length) {
      for (let i = 0; i < this.state.activeUsers.length; i++) {
        bubbles.push(
          <FeedBubble
            key={`user${i}`}
            user={this.state.activeUsers[i].username}
            status={this.state.activeUsers[i].status_message}
          />);
      }
    }


    const offline = [];
    if (this.state.inactiveUsers.length) {
      for (let i = 0; i < this.state.inactiveUsers.length; i++) {
        offline.push(
          <OfflineBubble
            key={`user${i}`}
            user={this.state.inactiveUsers[i].username}
            status={this.state.inactiveUsers[i].status_message}
          />);
      }
    }


    return (
      <div>
      <div>Username from local storage: {localStorage.username}</div>
        <NavBar
          text={"hello world!"}
          currentUserStatus={this.props.currentUserStatus}
          currentUserStatusMessage={this.props.currentUserStatus}
          ToggleButtonFunc={this.props.ToggleButtonFunc}
          currentUsername={this.props.currentUsername}
        />

        <div class="homepage">
          <div id="feed">
            {bubbles}
          </div>
          <div id="offline">
            {offline}
          </div>
          </div>

        
      </div>
    )
  }
}

export default Home;