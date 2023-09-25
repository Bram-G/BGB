import { React, useState, useEffect } from "react";
import "./style.css";
import { Button, Container } from "react-bootstrap";
import toggleAdd from "./assets/toggleAdd.png";
import toggleSub from "./assets/toggleSub.png";
import people from "./assets/people.png";
import playtime from "./assets/playtime.png";
import price from "./assets/price.png";
import rank from "./assets/rank.png";
import API from "../../utils/api";

function Info(props) {
    const [imgSrc, setImgSrc] = useState(toggleAdd);  
    const [gameLink, setGameLink] = useState("");
    // const gameID = window.location.pathname.split("/")[2];
  const gameID = props.gameID;
  const gameTitle = props.title || "No Title";
  const gamePublisher = props.publisher || "No Publisher";
  // console.log(gameID);
  //  ping it on the page and enter it as props.
  const currentUserId = props.userId;
  // console.log(currentUserId);
  useEffect(() => {
    console.log(props);
    createGameLink();

    
    // if the game's id is in the user's collection, display the toggleSub image, else display the toggleAdd image.
    // if the user clicks the toggleSub image, remove the game's id from the user's collection.
    // if the user clicks the toggleAdd image, add the game's id to the user's collection.
    if (props.bgData.includes(props.gameID)) {
      setImgSrc(toggleSub);
      // console.log("in collection");
    } else {
      setImgSrc(toggleAdd);
      // console.log("not in collection");
    }
  }, [props]);



    const handleClick = () => {
      // console.log("clicked " + gameID + " from collection " + currentUserId);
if(props.loggedIn === true){

  
  if (imgSrc === toggleAdd) {
    setImgSrc(toggleSub);
    API.addGame(currentUserId,gameID);
        // console.log("added"  + gameID + "to collection" + currentUserId);
      } else {
        setImgSrc(toggleAdd);
        API.removeGame(currentUserId,gameID);
        // console.log("removed" + gameID + "from collection" + currentUserId);
      }
      setImgSrc(imgSrc === toggleAdd ? toggleSub : toggleAdd);
    } else {
      alert("Please log in to add games to your collection");
    }
      }

  // const gameLink = `https://www.amazon.com/s?k=${props.title}+board+game`

  function createGameLink() {
    const googleGameTitle = gameTitle.replace(/\s+/g, '+');
    const googleGamePublisher = gamePublisher.replace(/\s+/g, '+');
    setGameLink(`https://www.google.com/search?q=where+to+buy+${googleGameTitle}+by+${googleGamePublisher}+board+game`);
  }



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
          <div className="quickInfoText">{props.publisher}</div>
        </div>
      </div>
      <div id="mainInfo">
        <div id="mainInfoText"> {props.description}</div>
      </div>
      <div id="buttonBox">
        <a href={gameLink} target="blank"><Button className="button1" variant="dark">Find Retailer</Button></a>
        {/* <a href="" target="blank"><Button className="button2" variant="dark">Play Now on BGA</Button></a> */}
      </div>
    </div>
  );
}
export default Info;
