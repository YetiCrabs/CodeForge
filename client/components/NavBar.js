import React, { Component } from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.statusSubmit = this.statusSubmit.bind(this);
  }

  statusSubmit(event) {
    event.preventDefault();
    console.log('Status submitted\n', `message: ${event.target[0].value}`, `username: ${localStorage.username}`, `user status: ${this.props.currentUserStatus}`);
    //target[0].value
    fetch(`/users/${document.cookie.ssid}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        statusMessage: event.target[0].value,
        status: !this.props.currentUserStatus
      })
    })

  }

  render() {
    return (
      <div className="navBar">
        <form onSubmit={this.statusSubmit}>
          <input name="status" type="text" placeholder="What are you working on?"/>
          <button onClick={this.props.ToggleButtonFunc}>Toggle</button>
        </form>
        <div>
          {/* <button onClick={this.props.ToggleButtonFunc}>Toggle</button>
          <br></br>
          {this.props.text}
          <br></br>
          This user's username is {this.props.currentUsername} 
          <br></br> */}
          This user is {this.props.currentUserStatus ? "active" : "inactive"}
        </div>
      </div>
    )
  }
};

// const NavBar = (props) => {
//   return (
//     <div className="navBar">
//     This is a div for the navbar

//       {/* <h2>{props.user}</h2>
//       <h3>{props.status}</h3> */}
//     </div>
//   )
// };

export default NavBar;