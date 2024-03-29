import React, { useState, useEffect } from "react";
import "./style.css";
import "react-multi-carousel/lib/styles.css";
import API from "../../utils/api";

function Collection() {
  const [bgData, setBGData] = useState([]);
  const [imgData, setImgData] = useState([]);
  const [userData, setUserData] = useState([]);

  const getUser = async () => {
    try {
      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        const response = await API.isValidToken(savedToken);

        if (response.isValid) {
          const data = await API.getSingleUser(response.user.id);
          setBGData(data.bg_collection);
          setUserData(data);
        } else {
          localStorage.removeItem("token");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = (event) => {
    const itemId = event.target.id;
    const itemName = event.target.alt;
    localStorage.setItem("gameSearchTerm", itemName);

    // Redirect the browser to the "/search/{id}" URL
    window.location.href = `/search/${itemId}`;
  };
  const handleRandom = (event) => {
    if (bgData.length === 0) {
      alert("Please add games to your collection first!");
    }
    // grabs random game from bgData array (just the id)
    const randomGame = bgData[Math.floor(Math.random() * bgData.length)];
    console.log(randomGame);
    // somehow grab the name of the game by matching the randomGameID to the imgData array
    const randomGameName = findGameNameById(imgData, randomGame);
    console.log(randomGameName);
    localStorage.setItem("gameSearchTerm", randomGameName);
    // Redirect the browser to the "/search/{id}" URL
    window.location.href = `/search/${randomGame}`;
  };
  function findGameNameById(gameArray, targetId) {
    // Loop through the array of games
    for (let i = 0; i < gameArray.length; i++) {
      // Check if the current game's ID matches the target ID
      if (gameArray[i].id === targetId) {
        // Return the name of the game if it's a match
        return gameArray[i].name;
      }
    }
    // Return null if no match is found
    return null;
  }
  function handleImportCollection() {
    let BGGusername = prompt("Please enter your BGG username");
  
    const fetchData = () => {
      fetch(`https://api.geekdo.com/xmlapi/collection/${BGGusername}`)
        .then((response) => {
          if (response.status === 202) {
            // If status is 202, wait for 3 seconds and retry
            return new Promise((resolve) => {
              setTimeout(() => resolve(fetchData()), 3000);
            });
          } else {
            return response.text();
          }
        })
        .then((data) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, "text/xml");
          const itemNodes = xmlDoc.querySelectorAll("item");
          const ids = Array.from(itemNodes).map((item) =>
            item.getAttribute("objectid")
          );
  
          const bggGameIds = { gameIds: ids };
  
          API.addGames(userData._id, bggGameIds).then(() => {
            window.location.reload();
          });
        });
    };
  
    fetchData();
  
    console.log(BGGusername);
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const fetchGameInfo = async () => {
      const gameArray = [];

      try{

      
      await Promise.all(
        bgData.map(async (game) => {
          const response = await fetch(  
            `https://boardgamegeek.com/xmlapi2/thing?id=${game}&type=boardgame,boardgameexpansion&stats=1`
          );
          const xmlData = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlData, "application/xml");

          const titleElement = xmlDoc.querySelector("item name");
          const title = titleElement ? titleElement.getAttribute("value") : "";

          const imageElement = xmlDoc.querySelector("item image");
          const image = imageElement ? imageElement.textContent : "";

          gameArray.push({ name: title, image: image, id: game });
        })
      )} catch (error) {
        console.log(`error fetching data for game`, error);
      }
      console.log(gameArray);
      setImgData(gameArray);
    };

    if (bgData.length > 0) {
      fetchGameInfo();
    }
  }, [bgData]);
  return (
    <div className="profile">
      <div className="collection">
        <div className="collectionBox">
          {imgData.map((game) => {
            return (
              <div key={game.id} className="collectionContainer">
                <div className="collectionImage" onClick={handleClick}>
                  <img
                    id={game.id}
                    src={game.image}
                    alt={game.name}
                    className="boardGameImage"
                  />
                </div>
                <div
                  className="collectionTitle"
                  id={game.id}
                  onClick={handleClick}
                >
                  {game.name}
                </div>
              </div>
            );
          })}
        </div>
        <div id="buttonBottom">
          <button className="randomGame" onClick={handleRandom}>
            Random Game
          </button>
          <button className="importGame" onClick={handleImportCollection}>
            Import BoardGameGeek Collection
          </button>
        </div>
      </div>
    </div>
  );
}
export default Collection;
