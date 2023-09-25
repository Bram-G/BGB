import React from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Header(props) {
  function handleLogout() {
    props.logout();
  }

  return (
    <div className="header">
      <a href="/" className="title">Board Game Butler</a>
      {props.loggedIn ? (
        <div id="rightSideHead">
        <a href="/" onClick={handleLogout} className="login"> Log Out </a> 
        <a href="/profile" className="login"> Profile</a>
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
