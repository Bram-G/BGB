import { React, useEffect } from "react";
import "./style.css";
import { Container } from "react-bootstrap";

import Dish from "./assets/dish.png";
import Search from "../../components/Search/Search";
import HotGames from "../../components/HotGames/HotGames";


function Home() {
  useEffect(() => {
    localStorage.removeItem("gameSearchArray");
    localStorage.removeItem("expansionIds");
    localStorage.removeItem("gameSearchTerm");
  }, []);


  return (
    <div className="home">
      <Container fluid className="homeCon">
        <div id="homePage">

        <div id="titleBox">
          <div id="homePageTitle">Find the Perfect Game <b/><b/> for Your Night In</div>
        </div>
        <div className="bottomRow">
          <div className="searchBarBox">
           <Search></Search>  
          </div>
           <img className="dishPic" src={Dish} alt=""></img>
           
        </div>
        <HotGames></HotGames>
        </div>
        

      </Container>
    </div>
  );
}

export default Home;
