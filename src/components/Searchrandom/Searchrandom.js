import React from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faDice } from '@fortawesome/free-solid-svg-icons'
import { Button } from "react-bootstrap";

function SearchRandom() {
  function roll() {
    window.location.reload(false);
    
  }


    return(
<InputGroup className="searchBarRandom" variant="secondary">
<InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSearch} color="black" /></InputGroup.Text>
<Form.Control
  placeholder="Search"
  aria-label="Search"
  aria-describedby="basic-addon1"
/>
<Button onClick={roll}id="basic-addon1" className="randomRollBtn"><FontAwesomeIcon icon={faDice} color="black" /></Button>
</InputGroup>
    )
}
export default SearchRandom;