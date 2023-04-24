import { React, useState, useEffect } from "react";
import "./style.css";
import { Container } from "react-bootstrap";
import Search from "../../components/Search/Search";
import Info from "../../components/Info/Info";
import SearchRandom from "../../components/Searchrandom/Searchrandom";
import Dish from "./assets/dish.png";
import testImg from "./assets/testimg.jpg";


function Random() {

  // TODO: Ping API for random game
  // TODO: Grab Title, Image, Description, Players, Playtime, Rank, Price,Amazon link and BGA link
  // TODO: Pass those values to Info component
  //TODO: if <boardgamefamily objectid="70360">Digital Implementations: Board Game Arena</boardgamefamily> exists render button with link to BGA

    const gameArray = [];
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
                <Info>
                  
                </Info>
              </div>
              <div></div>
            </div>
          </div>

          <div id="rightRow">
            <img className="gamePic" src={testImg}></img>
            <img className="dishPicCol" src={Dish}></img>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Random;
