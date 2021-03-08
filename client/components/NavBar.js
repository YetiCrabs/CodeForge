import React, { Component } from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.statusSubmit = this.statusSubmit.bind(this);
  }

  statusSubmit(event) {
    // console.log('before changing status', this.props.currentUserStatus)
    event.preventDefault();
    // console.log('Status submitted\n', `message: ${event.target[0].value}`, `username: ${localStorage.username}`, `user status: ${this.props.currentUserStatus}`);

    console.log(`status message will be set to ${event.target[0].value}`);

    document.getElementById("navbar").classList.toggle("navBarActive"); //changing styling on button click

    fetch(`/users/${document.cookie.split('=')[1]}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status_message: event.target[0].value,
        status: this.props.currentUserStatus
      })
    })

  }

  render() {
    return (
      <div id="navbar" className="navBarInactive navBarActive">
        <div className="navBar">
          <form onSubmit={this.statusSubmit}>
            <input id="input" name="status" type="text" placeholder="What are you working on?"/>
            <button onClick={this.props.ToggleButtonFunc}>Toggle</button>
            {/* <label className="switch">
              <input type="checkbox" onChange={this.statusSubmit}/>
              <span className="slider round"></span>
            </label> */}
          </form>
          {/* <div>
            This user is {this.props.currentUserStatus ? "active" : "inactive"}
          </div> */}
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