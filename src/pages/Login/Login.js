import { React, useState, useEffect } from "react";
import "./style.css";
import { Container, Form, Row, Button } from "react-bootstrap";

function Login() {
// TODO: Add login functionality
      //TODO:Check if user exists to database
      //TODO:Check if password is correct for user
      //TODO:If not, display error message
      //TODO:If both are correct, log user in and give Token
        //TODO:If user is logged in, redirect to home page
        //TODO: change login button to User's initials

  return (
    <div id="loginPage">
      <div id="loginBox">
        <Container fluid>
          <Row className="justify-content-center">
            <Form className="signup">
              <h1 className="titleText">Login</h1>
              <Form.Group className="mb-3" controlId="newUserEmail">
                <Form.Control
                  className="lato"
                  type="email"
                  placeholder="Email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="newUserPassword">
                <Form.Control
                  className="lato"
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <div className="underDiv">
                <Button
                  className="btn-style-secondary lato"
                  onClick={""}
                  variant="light"
                  type="submit"
                >
                  Login
                </Button>
                <p className="signUp">
                  Don't have an account? Sign Up <a href="/signup"> here!</a> 
                </p>
                
              </div>
            </Form>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Login;
