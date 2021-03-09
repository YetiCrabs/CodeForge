import React, { Component } from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.statusSubmit = this.statusSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  statusSubmit(event) {
    event.preventDefault();

    document.getElementById("navbar").classList.toggle("navBarActive"); //changing styling after status change

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

  deleteUser(event) {
    event.preventDefault();

    fetch(`/users/${document.cookie.split('=')[1]}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   status_message: event.target[0].value,
      //   status: this.props.currentUserStatus
      // })
    })
    .then(response => {
      window.location.href = response.url;
    })

  }

  componentDidMount() {
    // add event listener when the component renders
    window.onbeforeunload = function () {
      console.log("You tried to leave!!!");
      fetch(`/users/${document.cookie.split('=')[1]}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status_message: '',
          status: false,
        })
      })
      console.log("fetch should have sent")
      return "Did you save your stuff?"
    }
  }

  render() {
    return (
      <div id="navbar" className="navBarInactive">
        <div className="navBar">
          <form onSubmit={this.statusSubmit}>
            <input id="input" name="status" type="text" placeholder="What are you working on?"/>
            <button className='btn2' onClick={this.props.ToggleButtonFunc}> Go Active / Inactive</button>
          </form>

        </div>
        <form onSubmit={this.deleteUser}>
          <input className="btn2" name="delete" type="submit" value="Delete My Account" />
        </form>
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