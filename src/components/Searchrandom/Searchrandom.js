import React from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faDice } from '@fortawesome/free-solid-svg-icons'
import { Button } from "react-bootstrap";

function SearchRandom() {


    return(
<InputGroup className="searchBarRandom" variant="secondary">
<InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSearch} color="black" /></InputGroup.Text>
<Form.Control
  placeholder="Search"
  aria-label="Search"
  aria-describedby="basic-addon1"
/>
<Button onclick=""id="basic-addon1"><FontAwesomeIcon icon={faDice} color="black" /></Button>
</InputGroup>
    )
}
export default SearchRandom;