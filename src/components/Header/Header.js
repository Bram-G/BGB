import React from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Header(props) {
  return (
    <div className="header">
      <a href="/" className="title">Board Game Butler</a>
      {props.loggedIn ? (
        <div id="rightSideHead">
        <a href="/profile" className="login"> Profile</a>
        <a href="/" onClick={props.logout} className="login"> Log Out </a> 
        </div>
      ) : (
        <div id="rightSideHead">

        <a href="/login" className="login">Log In</a>
        <a href="/signup" className="login">Sign Up</a>
        </div>
      )}
    </div>
  );
}

export default Header;
