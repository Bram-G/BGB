import { React, useState, useEffect } from "react";
import "./style.css";
import { Container,Form,Row,Button } from "react-bootstrap";

function SignUp() {
  // TODO: Add Singup functionality
  // TODO: Check if user already exists in database
      //TODO:If user exists, display error message with sign in link

  //TODO:If user does not exist, and all pertinent information exists add user to database
      //TODO:If user is added to database, log user in and give Token
      //TODO: on account creation redirect to account page with edit account modal open
          //TODO: prompt for Board Game Geek Usermame
            //TODO: if user has a BGG account, import their collection and add to database
            //TODO: if user does not have a BGG account, prompt them to search for games
            
  return (
    <div id="loginPage">
      <div id="loginBox">
      <Container fluid>
        <Row className="justify-content-center">
          <Form className='signup'>
            <h1 className="bowlby">SIGN UP</h1>
            <Form.Group className="mb-3" controlId="newUserName">
              <Form.Control className="lato" type="text" placeholder="Username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="newUserEmail">
              <Form.Control className="lato" type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="newUserPassword">
              <Form.Control className="lato" type="password" placeholder="Password" />
            </Form.Group>

            <Button className="btn-style-secondary lato" onClick={""} variant="light" type="submit">
              Sign Up
            </Button>
          </Form>
        </Row>
      </Container>
      </div>
    </div>
  );
}

export default SignUp;
