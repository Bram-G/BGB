import { React, useState, useEffect } from "react";
import "./style.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dish from "./assets/dish.png";


function Home() {
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
        <div id="titleBox">
          <div className="row"id="homePageTitle">Find the Perfect Game for Your Night In</div>
        </div>
        <img src={Dish}></img>
            <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon="fas fa-search" /></InputGroup.Text>
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      </Container>
    </div>
  );
}

export default Home;
