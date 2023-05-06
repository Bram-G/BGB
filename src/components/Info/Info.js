import { React, useState, useEffect } from "react";
import "./style.css";
import { Button, Container } from "react-bootstrap";
import toggleAdd from "./assets/toggleAdd.png";
import toggleSub from "./assets/toggleSub.png";
import people from "./assets/people.png";
import playtime from "./assets/playtime.png";
import price from "./assets/price.png";
import rank from "./assets/rank.png";

function Info(props) {

    const [imgSrc, setImgSrc] = useState(toggleAdd);

    const handleClick = () => {
      setImgSrc(imgSrc === toggleAdd ? toggleSub : toggleAdd);}

  const gameLink = `https://www.amazon.com/s?k=${props.title}+board+game`
  return (
    <div>
      <div id="topInfo">
        <div id="titleText">{props.title}</div>
        <img
          id="collectionToggle"
          src={imgSrc}
          alt="collection toggle"
          title="Add or Remove from Collection"
          onClick={handleClick}
        ></img>
      </div>
      <div id="quickInfo">
        <div className="quickInfoSubBox">
          {/* change info text to {props.players} */}
          <img className="quickInfoIcon" title="Players" src={people}></img>
          <div className="quickInfoText">{props.players}</div>
        </div>
        <div className="quickInfoSubBox">
          {/* change info text to {props.playtime} */}
          <img className="quickInfoIcon" title="Playtime" src={playtime}></img>
          <div className="quickInfoText">{props.time}</div>
        </div>
        <div className="quickInfoSubBox">
          {/* change info text to {props.rank} */}
          <img className="quickInfoIcon" title="Rank" src={rank}></img>
          <div className="quickInfoText">{props.rank}</div>
        </div>
        <div className="quickInfoSubBox">
          {/* change info text to {props.price} */}
          <img className="quickInfoIcon" title="Cost" src={price}></img>
          <div className="quickInfoText">{props.price}</div>
        </div>
      </div>
      <div id="mainInfo">
        <div id="mainInfoText"> {props.description}</div>
      </div>
      <div id="buttonBox">
        <a href={gameLink} target="blank"><Button className="button1" variant="dark">Buy on Amazon</Button></a>
        <a href="" target="blank"><Button className="button2" variant="dark">Play Now on BGA</Button></a>
      </div>
    </div>
  );
}
export default Info;
