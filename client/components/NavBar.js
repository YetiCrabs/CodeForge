import React, { Component } from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  statusSubmit() {

  }

  render() {
    return (
      <div className="navBar">
        This is a div for the navbar!!! 
        <form onSubmit={this.statusSubmit}>
          <input name="status" type="text" value={this.props.currentUserStatusMessage} placeholder="What are you working on?"/>
          <button onClick={this.props.ToggleButtonFunc}>Toggle</button>
        </form>
        {/* <div>
          <button onClick={this.props.ToggleButtonFunc}>Toggle</button>
          <br></br>
          {this.props.text}
          <br></br>
          This user's username is {this.props.currentUsername} 
          <br></br>
          This user is {this.props.currentUserStatus}
        </div> */}
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