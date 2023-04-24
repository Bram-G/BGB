import { React, useState, useEffect } from "react";
import "./style.css";
import { Button, Container } from "react-bootstrap";
import toggleAdd from "./assets/toggleAdd.png";
import toggleSub from "./assets/toggleSub.png";
import people from "./assets/people.png";
import playtime from "./assets/playtime.png";
import price from "./assets/price.png";
import rank from "./assets/rank.png";

function Info() {
  return (
    <div>
      <div id="topInfo">
        <div id="titleText">Abyss</div>
        <img
          id="collectionToggle"
          src={toggleSub}
          alt="collection toggle"
          title="Add or Remove from Collection"
        ></img>
      </div>
      <div id="quickInfo">
        <div className="quickInfoSubBox">
          {/* change info text to {props.players} */}
          <img className="quickInfoIcon" title="Players" src={people}></img>
          <div className="quickInfoText">2-4</div>
        </div>
        <div className="quickInfoSubBox">
          {/* change info text to {props.playtime} */}
          <img className="quickInfoIcon" title="Playtime" src={playtime}></img>
          <div className="quickInfoText">40-60</div>
        </div>
        <div className="quickInfoSubBox">
          {/* change info text to {props.rank} */}
          <img className="quickInfoIcon" title="Rank" src={rank}></img>
          <div className="quickInfoText">20th</div>
        </div>
        <div className="quickInfoSubBox">
          {/* change info text to {props.price} */}
          <img className="quickInfoIcon" title="Cost" src={price}></img>
          <div className="quickInfoText">$30</div>
        </div>
      </div>
      <div id="mainInfo">
        <div id="mainInfoText"> take the role of courtesans of the Nippon emperor. They take care of his Giant Panda by growing a bamboo plantation. Their mission: to farm parcels of land, irrigate them, and have green, yellow or pink bamboo grow. In turn, they see what the weather brings and perform two actions from among those offered to them: get a new plot of land or irrigation channel, grow bamboo, feed the panda or draw an objective card. The game ends when a player has completed 7 to 9 objectives (depending on the number of players). The player who gets the best score by adding the total value of their completed objective...</div>
      </div>
      <div id="buttonBox">
        <a href=""><Button className="button1" variant="dark">Buy on Amazon</Button></a>
        <a href=""><Button className="button2" variant="dark">Play Now on BGA</Button></a>
      </div>
    </div>
  );
}
export default Info;
