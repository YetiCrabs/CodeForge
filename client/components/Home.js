import React, { Component } from 'react';
import FeedBubble from './FeedBubble.js'

class Home extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   activeusers: [
    //     {'_id': 1, 'username': 'harry', 'status': true, 'statusMessage': 'reviewing unit 11 - authentication'},
    //     {'name': 'brianjungk', 'status': 'Brushing up on some redux'},
    //     {'name': 'nathan_r', 'status': 'algo practice'},
    //     {'name': 'rachelfarley', 'status': 'refactoring my solo project'},
    //     {'name': 'mattnyc', 'status': 'practicing with databases'},
    //     {'name': 'maureen', 'status': 'react time!'}
    //   ],
    //   inactiveUsers: data.filter(status: true)
    // }; // username: string; status: boolean; statusMessage: string; loggedIn: string; loggedOut; string
    this.state = {};
  }

  componentDidMount() {
    console.log('Home page did mount')

    fetch('/users')
      .then(response => response.json())
      .then(users => {
        this.setState({...this.state, activeUsers: users.filter(user => user.status), inactiveUsers: user.filter(user => !user.status)});
        console.log(this.state);
      })
  }

  render() {
    const bubbles = [];
    for(let i = 0; i < this.state.activeUsers.length; i++) {
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