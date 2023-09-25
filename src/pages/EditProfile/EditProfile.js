import React, { useState, useEffect } from "react";
import "./style.css";
import "react-multi-carousel/lib/styles.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import API from "../../utils/api";
// import { set } from "mongoose";

function EditProfile() {
  const [bgData, setBGData] = useState([]);
  const [imgData, setImgData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [profileName, setProfileName] = useState("");

  const [pName, setPName] = useState([])
  const [pEmail, setPEmail] = useState([])

  const [name, setName] = useState([])
  const [email, setEmail] = useState([])


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'username') {
      setPName(value); // Update pName state
    } else if (name === 'email') {
      setPEmail(value); // Update pEmail state
    }

    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;
    if (inputType === 'email') {
      setEmail(inputValue);
    } else if (inputType === 'username') {
      setName(inputValue);
    }
  };

  async function editUserInfo() {
    const userInfoObj = {
      email: pEmail || userData.email,
      username: pName || userData.username,
    }
    await API.updateUser(userData.id, userInfoObj)

    window.location.href = `/profile`;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    editUserInfo();
  }

  const getUser = async () => {
    try {
      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        const response = await API.isValidToken(savedToken);

        if (response.isValid) {
          const data = await API.getSingleUser(response.user.id);
          setBGData(data.bg_collection);
          setUserData(data);
          
            setPName(data.username || "");
            setPEmail(data.email || "")
            
          
        } else {
          localStorage.removeItem("token");
          
        }
      }
      else{
        window.location.href = `/login`;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
  }, [bgData]);
  return (

    <Container className="userProfile">
      <Row className="userProfileUnderline">
        <Col sm="12" className="title-text ">
          <h3>Edit User Info</h3>
        </Col>
      </Row>
      <Row>
        <Form >

          <Form.Group className="mb-3">
            <Form.Label className="profile-label ">Username:</Form.Label>
            <Form.Control className="lato" name="username" onChange={handleInputChange} type="text" placeholder={userData.username} value={pName} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="profile-label ">Email:</Form.Label>
            <Form.Control className="lato" name="email" onChange={handleInputChange} type="email" placeholder={userData.email} value={pEmail} />
          </Form.Group>

          <Button className="btn-style-secondary lato" onClick={handleFormSubmit}>
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
export default EditProfile;
