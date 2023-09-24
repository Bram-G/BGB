import { React, useState, useEffect } from "react";
import "./style.css";
import { Container } from "react-bootstrap";
import Info from "../../components/Info/Info";
import Search from "../../components/Search/Search";
import Dish from "./assets/dish.png";
// import Search from "../../components/Search/Search";
import DidYouMean from "../../components/DidYouMean/DidYouMean";
import ChatBot from "../../components/ChatBot/ChatBot";
import API from "../../utils/api";

function SearchResults(props) {
  const gameID = window.location.pathname.split("/")[2];
  // console.log(gameID);

  const [userData, setUserData] = useState([]);
  const [bgData, setBGData] = useState([]);

  const [gameData, setGameData] = useState({
    title: "",
    image: "",
    description: "",
    players: "",
    time: "",
    rank: "",
    price: "",
    bga: false,
  });

  useEffect(() => {
    const fetchMainData = async () => {
      try {
        const response = await fetch(
          `https://boardgamegeek.com/xmlapi2/thing?id=${gameID}&type=boardgame,boardgameexpansion&stats=1`
        );
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "application/xml");
        // console.log(xmlDoc);

        const titleElement = xmlDoc.querySelector("item name");
        const title = titleElement ? titleElement.getAttribute("value") : "";

        const imageElement = xmlDoc.querySelector("item image");
        const image = imageElement ? imageElement.textContent : "";

        const unfilteredDescriptionElement =
          xmlDoc.querySelector("item description");
        const unfilteredDescription = unfilteredDescriptionElement
          ? unfilteredDescriptionElement.textContent
          : "";
        // console.log(unfilteredDescription);
        const description = unfilteredDescription.replace(
          /[/&#?(\d+);/]/g,
          "  "
        );

        const minplayersElement = xmlDoc.querySelector("item minplayers");
        const minplayers = minplayersElement
          ? minplayersElement.getAttribute("value")
          : "";

        const maxplayersElement = xmlDoc.querySelector("item maxplayers");
        const maxplayers = maxplayersElement
          ? maxplayersElement.getAttribute("value")
          : "";

        const players = `${minplayers}-${maxplayers}`;

        const minplaytimeElement = xmlDoc.querySelector("item minplaytime");
        const minplaytime = minplaytimeElement
          ? minplaytimeElement.getAttribute("value")
          : "";

        const maxplaytimeElement = xmlDoc.querySelector("item maxplaytime");
        const maxplaytime = maxplaytimeElement
          ? maxplaytimeElement.getAttribute("value")
          : "";

        const time = `${minplaytime}-${maxplaytime}`;

        const rankElement = xmlDoc.querySelector(
          "item statistics ratings average"
        );
        const rank = rankElement ? rankElement.getAttribute("value") : "";

        const linkElement = xmlDoc.querySelector(
          'link[type="boardgamepublisher"]'
        );
        const publisher = linkElement.getAttribute("value");
        // console.log(publisher);

        const bga = false;

        // console.log(publisher);
        localStorage.setItem("gameSearchTerm", title);
        setGameData({
          title,
          image,
          description,
          players,
          time,
          rank,
          bga,
          publisher,
        });
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const savedToken = localStorage.getItem("token");

        if (savedToken) {
          const response = await API.isValidToken(savedToken);
          if (response.isValid) {
            const data = await API.getSingleUser(response.user.username);
            // console.log(data);
            setUserData(data);
            setBGData(data.bg_collection);
            localStorage.setItem("userId", data.id);
          } else {
            localStorage.removeItem("token");
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    // console.log(props.loggedIn)
    fetchUserData();
    fetchMainData();
  }, [gameID]);

  return (
    <div className="home">
      <Container fluid>
        <div id="allTogether">
          <div id="topRow">
            <div id="leftRow">
              <div>
                <div className="searchBoxContainer">

                <Search></Search>
                </div>
                <div id="infoBox">
                  <Info
                  loggedIn={props.loggedIn}
                    gameID={gameID}
                    userId={userData.id}
                    bgData={bgData}
                    title={gameData.title}
                    image={gameData.image}
                    description={gameData.description}
                    players={gameData.players}
                    time={gameData.time}
                    rank={gameData.rank}
                    price={gameData.price}
                    publisher={gameData.publisher}
                  ></Info>
                </div>
              </div>
            </div>
            <div id="rightRow">
              <img className="gamePic" src={gameData.image}></img>
              <img className="dishPicCol" src={Dish}></img>
            </div>{" "}
          </div>
          <div id="bottomRow">
            <ChatBot
              title={gameData.title}
              publisher={gameData.publisher}
            ></ChatBot>
          </div>
        </div>
        <div className="bottomHalf">
          <div className="didYouMeanContainer">
            <DidYouMean></DidYouMean>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SearchResults;
