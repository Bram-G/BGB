import { React, useState, useEffect } from "react";
import "./style.css";
import { Container } from "react-bootstrap";
import Info from "../../components/Info/Info";
import SearchRandom from "../../components/Searchrandom/Searchrandom";
import Dish from "./assets/dish.png";

function Random() {
  // TODO: Ping board game atlas API for random game and grab title

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
  
    const randomURL =
      "https://api.boardgameatlas.com/api/search?random=true&client_id=gwluPRwMeB&pretty=true";
  
    function randomGameFetch() {
      fetch(randomURL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const game = data.games[0];
          setGameData({
            title: game.name,
            image: game.images.medium,
            description: game.description_preview,
            players: `${game.min_players}-${game.max_players}`,
            time: `${game.min_playtime}-${game.max_playtime}`,
            rank: game.rank,
            price: game.price,
            bga: true,
          });
        });
    }
  
    useEffect(() => {
      randomGameFetch();
    }, []);

  //TODO: if <boardgamefamily objectid="70360">Digital Implementations: Board Game Arena</boardgamefamily> exists render button with link to BGA

  // const gameArray = [];
  // const url = 'https://cors-anywhere.herokuapp.com/https://boardgamegeek.com/xmlapi/collection/Pahrrk';
  // const gameFetch = fetch(url)
  // .then(response => response.text())
  // .then(xmlString => {
  //   const parser = new DOMParser();
  //   const xml = parser.parseFromString(xmlString, 'application/xml');
  //   const itemNodes = xml.querySelectorAll('item');
  //   itemNodes.forEach(itemNode => {
  //     const nameNode = itemNode.querySelector('name');
  //     const name = nameNode.textContent;
  //     gameArray.push(name);
  //   }
  //   );
  //   console.log(gameArray)
  // })
  // .catch(error => console.error(error));
  // const consolelog = new DOMParser().parseFromString(danUserGames, "text/xml")

  return (
    <div className="home">
      <Container fluid>
        <div id="allTogether">
          <div id="leftRow">
            <div>
              <SearchRandom></SearchRandom>
              <div id="infoBox">
                <Info
                  title={gameData.title}
                  image={gameData.image}
                  description={gameData.description}
                  players={gameData.players}
                  time={gameData.time}
                  rank={gameData.rank}
                  price={gameData.price}
                ></Info>
              </div>
              <div></div>
            </div>
          </div>

          <div id="rightRow">
            <img className="gamePic" src={gameData.image}></img>
            <img className="dishPicCol" src={Dish}></img>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Random;
