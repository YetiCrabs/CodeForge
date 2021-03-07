import React, { Component } from 'react';
import FeedBubble from './FeedBubble.js'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [
      {'name': 'harry', 'status': 'reviewing unit 11 - authentication'},
      {'name': 'brianjungk', 'status': 'Brushing up on some redux'},
      {'name': 'nathan_r', 'status': 'algo practice'},
      {'name': 'rachelfarley', 'status': 'refactoring my solo project'},
      {'name': 'mattnyc', 'status': 'practicing with databases'},
      {'name': 'maureen', 'status': 'react time!'}
    ] };
  }

  componentDidMount() {
    console.log('Home page did mount')
    console.log(this.state);
  }

  render() {
    const bubbles = [];
    for(let i = 0; i < this.state.users.length; i++) {
      bubbles.push(
        <FeedBubble
          key={`user${i}`}
          user={this.state.users[i].name}
          status={this.state.users[i].status}
        />);
    }

    return (
      <div id="feed">
        { bubbles }
      </div>
    )
  }
}

export default Home;