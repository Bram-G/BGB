import { React, useState, useEffect } from "react";
import "./style.css";
import { Container } from "react-bootstrap";
import Info from "../../components/Info/Info";
import SearchRandom from "../../components/Searchrandom/Searchrandom";
import Dish from "./assets/dish.png";
import Search from "../../components/Search/Search";

function SearchResults() {

   const gameID = window.location.pathname.split("/")[2];
   console.log(gameID)

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
      const fetchData = async () => {
        try {
          const response = await fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${gameID}&type=boardgame&stats=1`);
          const xmlData = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
          console.log(xmlDoc)
  
          // Parse the XML data and extract the variables
          const title = xmlDoc.querySelector('item name').getAttribute('value');
          const xmlImage = xmlDoc.querySelector('item image').textContent
          const image = xmlImage 
          const unfilteredDescription = xmlDoc.querySelector('item description').textContent;
          console.log(unfilteredDescription)
          const description = unfilteredDescription.replace(/[/&#?(\d+);/g]/g, "  ");
          const minplayers = xmlDoc.querySelector('item minplayers').getAttribute('value');
          const maxplayers = xmlDoc.querySelector('item maxplayers').getAttribute('value');
          const players = `${minplayers}-${maxplayers}`;
          const minplaytime = xmlDoc.querySelector('item minplaytime').getAttribute('value');
          const maxplaytime = xmlDoc.querySelector('item maxplaytime').getAttribute('value');
          const time = `${minplaytime}-${maxplaytime}`;
          const rank = xmlDoc.querySelector('item statistics ratings ranks rank').getAttribute('value');
          // const bgaElement = xmlDoc.querySelector('item link type="boardgamefamily" id="70360" value="Digital Implementations: Board Game Arena"');
          // const bga = bgaElement ? true : false;
          const bga = false;
          // Add more variables extraction as needed
  
          // Set the game data to the extracted variables
          console.log(image);
          setGameData({ title, image, description, players, time, rank, bga });
        } catch (error) {
          console.error('Error fetching game data:', error);
        }
      };
  
      fetchData();
    }, [gameID]);
  
  
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

export default SearchResults;
