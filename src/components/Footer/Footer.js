import React from "react";
import "./style.css";
import gitHub from "./assets/gitHub.png"
import linkedIn from "./assets/linkedIn.png"
import stackOverflow from "./assets/stackOverflow.png"


const Footer = () => {
  return(
    <div className="footer">
        <a target="_blank" href={"https://github.com/Bram-G"} rel="noreferrer"> <img id="icons" src={gitHub} alt="GitHub Logo"/></a>
        <a target="_blank" href={"https://www.linkedin.com/in/bram-g"} rel="noreferrer"><img id="icons"src={linkedIn} alt="LinkedIn Logo"/></a>
        <a target="_blank" href={"https://stackoverflow.com/users/21333322/bram-g"} rel="noreferrer"><img id="icons"src={stackOverflow} alt="StackOverFlow Logo"/></a>
    </div>
  )
};

export default Footer;