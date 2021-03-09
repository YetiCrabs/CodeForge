import React, { Component } from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.statusSubmit = this.statusSubmit.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
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

  deleteUser(event) {
    // console.log('before changing status', this.props.currentUserStatus)
    event.preventDefault();
    // console.log('Status submitted\n', `message: ${event.target[0].value}`, `username: ${localStorage.username}`, `user status: ${this.props.currentUserStatus}`);
    // console.log(`status message will be set to ${event.target[0].value}`);
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
      // alert('try to pass in Joe');
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
            {/* <label className="switch">
              <input type="checkbox" onChange={this.statusSubmit}/>
              <span className="slider round"></span>
            </label> */}
          </form>
          {/* <div>
            This user is {this.props.currentUserStatus ? "active" : "inactive"}
          </div> */}

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