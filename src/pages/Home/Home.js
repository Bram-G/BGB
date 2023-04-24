import { React, useState, useEffect } from "react";
import "./style.css";
import { Container } from "react-bootstrap";

import Dish from "./assets/dish.png";
import Search from "../../components/Search/Search";


function Home() {


  return (
    <div className="home">
      <Container fluid>
        <div id="homePage">

        <div id="titleBox">
          <div className="row"id="homePageTitle">Find the Perfect Game for Your Night In</div>
        </div>
        <div className="bottomRow">
           <Search></Search>  
           <img className="dishPic" src={Dish}></img>
           
        </div>
        </div>
        

      </Container>
    </div>
  );
}

export default Home;
