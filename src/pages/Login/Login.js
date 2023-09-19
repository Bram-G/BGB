import { React, useState, useEffect } from "react";
import "./style.css";
import { Container, Form, Row, Button } from "react-bootstrap";
import API from "../../utils/api"
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();

  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleUsernameInputChange = (event) => {
    console.log("EventChanging")
    setUserName(event.target.value);
  };
  const handlePassInputChange = (event) => {
    console.log("EventChanging")
    setUserPassword(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const userObj = {
      username: userName,
      password: userPassword
    }
    API.login(userObj).then(data => {
      console.log(data);
      if (data.token) {
        props.setToken(data.token);
        props.setIsLoggedIn(true);
        props.setUsername(data.user.username)
        localStorage.setItem("token", data.token)
        localStorage.setItem("userId", data.user.id)
        navigate("/profile")
      }
    })


    console.log("Submit")
    console.log(userName)
    console.log(userPassword)

  }
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
            <Form className="signup" onSubmit={handleSubmit}>
              <h1 className="titleText">Login</h1>
              <Form.Group className="mb-3" controlId="userName" onChange={handleUsernameInputChange}>
                <Form.Control
                  className="lato"
                  type="username"
                  placeholder="Username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="userPassword" onChange={handlePassInputChange}>
                <Form.Control
                  className="lato"
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <div className="underDiv">
                <Button
                  className="btn-style-secondary lato"
                  onClick={handleSubmit}
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
