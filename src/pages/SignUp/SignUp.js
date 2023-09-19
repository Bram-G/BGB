import { React, useState, useEffect } from "react";
import "./style.css";
import { Container,Form,Row,Button } from "react-bootstrap";
import API from "../../utils/api";

function SignUp() {

  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submit")
    console.log(newUserName)
    console.log(newUserEmail)
    console.log(newUserPassword)

  }
  const handlePassInputChange = (event) => {
    console.log("EventChanging")
    setNewUserPassword(event.target.value);
  };
  const handleEmailInputChange = (event) => {
    console.log("EventChanging")
    setNewUserEmail(event.target.value);
  };
  const handleUserNameInputChange = (event) => {
    console.log("EventChanging")
    setNewUserName(event.target.value);
  };
  function handleSubmit(event) {
    event.preventDefault();
    if(!newUserName || !newUserEmail || !newUserPassword){
      alert("Please fill out all fields")
      return
    }
    if(newUserPassword.length < 8){
      alert("Password must be at least 8 characters")
      return
    }
    if(!newUserEmail.includes("@")){
      alert("Please enter a valid email address")
      return
    }

    API.createUser({ username: newUserName, email: newUserEmail, password: newUserPassword }).then((res) => {
      console.log("Response from API:", res);
      if (res.message === "User created") {
        console.log("User Created");
        localStorage.setItem("token", res.token);
        window.location.href = `/profile`;
        // Redirect to the user's account page or perform any other actions.
      } else if (res.message === "User already exists") {
        // HTTP status code 409 represents a conflict, meaning the user already exists.
        alert("User Already Exists");
        console.log("User Already Exists");
      } else {
        // Handle other error cases (e.g., server errors) appropriately.
        alert("Error creating user");
        console.error("Error creating user:", res);
      }
    }).catch((error) => {
      console.error("Network error:", error);
      // Handle network errors or other issues here
      console.error("Network error:", error);
    });
    ;
  }

  
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
          <Form onSubmit={handleSubmit} className='signup'>
            <h1 className="bowlby">SIGN UP</h1>
            <Form.Group className="mb-3" controlId="newUserName">
              <Form.Control className="lato" type="text" placeholder="Username" onChange={handleUserNameInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="newUserEmail">
              <Form.Control className="lato" type="email" placeholder="Email" onChange={handleEmailInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="newUserPassword">
              <Form.Control className="lato" type="password" placeholder="Password" onChange={handlePassInputChange} />
            </Form.Group>

            <Button className="btn-style-secondary lato" onClick={handleSubmit} variant="light" type="submit">
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
