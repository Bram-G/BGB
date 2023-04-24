import React from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <div className="header">
      <a href="/" className="title">Board Game Butler</a>
      <a href="/login" className="login">Log In</a>
    </div>
  );
}

export default Header;
