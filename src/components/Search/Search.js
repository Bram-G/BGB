import { React, useState } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faDice } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Search() {
  //TODO: Add search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    console.log("EventChanging")
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      console.log("handleSearch")
      const response = await fetch(
        `https://boardgamegeek.com/xmlapi2/search?parameters&query=${searchTerm}`
      );
      const xmlResponse = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlResponse, "application/xml");
      const items = xmlDoc.getElementsByTagName("item");
      if (items.length > 0) {
        const firstItemId = items[0].getAttribute("id");
        // Redirect to the results page with the first item's ID
        console.log( firstItemId )
        // navigate(`/search/${firstItemId}`);
      } else {
        console.log("No search results found");
      }
    } catch (error) {
      console.error("Error searching for board game:", error);
    }
  };

  //TODO:Search for game by name using https://boardgamegeek.com/xmlapi2/search?parameters&query={GAMENAME}
  //TODO: Take Thing numbers from search and use https://boardgamegeek.com/xmlapi2/thing?id={THINGNUMBER} to get game info
  //TODO: Pass game info to Info Component and display on page

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
    <Form onSubmit={handleSearch}>
    <InputGroup
      className="searchBar"
      variant="secondary"
      >
      <InputGroup.Text id="basic-addon1" title="Random Game">
        
        <FontAwesomeIcon icon={faSearch} color="black" />
      </InputGroup.Text>
      <Form.Control
        onChange={handleInputChange}
        placeholder="Search"
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
      <a href="/random">
        {" "}
        <Button id="basic-addon1">
          <FontAwesomeIcon icon={faDice} color="black" />
        </Button>
      </a>
    </InputGroup>
        </Form>
  );
}
export default Search;
