import { React, useState } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faDice } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchRandom() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    console.log("EventChanging");
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log("handleSearch");
      const response = await fetch(
        `https://boardgamegeek.com/xmlapi2/search?parameters&query=${searchTerm}&exact=1&type=boardgame`
      );
      const xmlResponse = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlResponse, "application/xml");
      const items = xmlDoc.getElementsByTagName("item");
      if (items.length > 0) {
        const firstItemId = items[0].getAttribute("id");
        // Redirect to the results page with the first item's ID
        console.log(firstItemId);
        navigate(`/search/${firstItemId}`);
        window.location.reload();
      } else {
        console.log("No search results found");
        alert("No search results found");
      }
    } catch (error) {
      console.error("Error searching for board game:", error);
    }
  };

  return (
    <Form onSubmit={handleSearch}>
      <InputGroup className="searchBarRandom" variant="secondary">
        <InputGroup.Text id="basic-addon1">
          <FontAwesomeIcon icon={faSearch} color="black" />
        </InputGroup.Text>
        <Form.Control
          onChange={handleInputChange}
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
        <a href="/random">
          <Button id="basic-addon1" className="randomRollBtn">
            <FontAwesomeIcon icon={faDice} color="black" />
          </Button>
        </a>
      </InputGroup>
    </Form>
  );
}
export default SearchRandom;
