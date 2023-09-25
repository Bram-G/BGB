import { React, useState } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Search() {
  //TODO: Add search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    console.log("EventChanging")
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      var gameSearchArray = [];
      console.log("handleSearch")
      const response = await fetch(
        `https://boardgamegeek.com/xmlapi2/search?parameters&query=${searchTerm}&type=boardgame`
      );
      const xmlResponse = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlResponse, "application/xml");
      const items = xmlDoc.getElementsByTagName("item");
      if (items.length > 0) {
        for (let i = 0; i<items.length; i++) {
          const name = items[i].getAttribute("id");
          gameSearchArray.push(name);
          // console.log(name) 
        }
        // localStorage.setItem("gameSearchArray",(gameSearchArray));
        localStorage.setItem("gameSearchTerm",(searchTerm));
        const firstItemId = items[0].getAttribute("id");
        // Redirect to the results page with the first item's ID
        console.log( firstItemId )
        navigate(`/search/${firstItemId}`);
        window.location.reload();
      } else {
        console.log("No search results found");
      }
    } catch (error) {
      console.error("Error searching for board game:", error);
    }
  };
  return (
    <Form className="searchContainer" onSubmit={handleSearch}>
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
    </InputGroup>
        </Form>
  );
}
export default Search;
