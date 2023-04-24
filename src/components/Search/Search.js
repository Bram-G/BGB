import React from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faDice } from '@fortawesome/free-solid-svg-icons'
import { Button } from "react-bootstrap";

function Search() {
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
const diceRoll = () => {
    
}
    return(
<InputGroup className="searchBar" variant="secondary">
<InputGroup.Text id="basic-addon1" title="Random Game"><FontAwesomeIcon icon={faSearch} color="black" /></InputGroup.Text>
<Form.Control
  placeholder="Search"
  aria-label="Search"
  aria-describedby="basic-addon1"
/>
<Button onclick={diceRoll}id="basic-addon1"><FontAwesomeIcon icon={faDice} color="black" /></Button>
</InputGroup>
    )
}
export default Search;