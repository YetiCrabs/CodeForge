import React, { Component } from 'react';
import FeedBubble from './FeedBubble.js'

class Home extends Component {
  constructor(props) {
    super(props);
      this.state = {
      activeUsers: [],
      inactiveUsers: [],
    };
  }

  componentDidMount() {
    console.log('Home page did mount')
    
    fetch('/users')
      .then(response => response.json())
      .then(users => {
        this.setState({...this.state, activeUsers: users.filter(user => user.status), inactiveUsers: users.filter(user => !user.status)});
        console.log(this.state);
      })
  }

  render() {
    const bubbles = [];
    if (this.state.activeUsers.length) {
      for(let i = 0; i < this.state.activeUsers.length; i++) {
        bubbles.push(
          <FeedBubble
            key={`user${i}`}
            user={this.state.activeUsers[i].username}
            status={this.state.activeUsers[i].status_message}
          />);
      }
    }

    return (
      <div id="feed">
        { bubbles }
      </div>
    )
  }
}

export default Home;