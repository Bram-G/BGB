import React, { useState, useEffect } from "react";
import "./style.css";
import "react-multi-carousel/lib/styles.css";
import API from "../../utils/api";
// import { set } from "mongoose";

function Profile() {
  const [bgData, setBGData] = useState([]);
  const [imgData, setImgData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [profileName, setProfileName] = useState("");

  const getUser = async () => {
    try {
      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        const response = await API.isValidToken(savedToken);

        if (response.isValid) {
          const data = await API.getSingleUser(response.user.username);
          setBGData(data.bg_collection);
          setUserData(data);
        } else {
          localStorage.removeItem("token");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

    const handleClick = (event) => {
    const itemId = event.target.id;
            
    // Redirect the browser to the "/search/{id}" URL
    window.location.href = `/search/${itemId}`;
  };
  

  useEffect(() => {
    getUser();    

  }, []);

  useEffect(() => {
    const fetchGameInfo = async () => {
      const gameArray = [];

      // console.log(onlyCapitalLetters(userData.username));
      function onlyCapitalLetters (str) {
        if(str === null || str === undefined) {
          console.log(str)
          setProfileName("User")
          return str;
        }
        else{
          str.replace(/[^A-Z]+/g, "");
          setProfileName(str)
        }
    }
      const capitalUserData = onlyCapitalLetters(userData.username);
      console.log(capitalUserData);
    


      await Promise.all(
        bgData.slice(0,3).map(async (game) => {
          const response = await fetch(
            `https://boardgamegeek.com/xmlapi2/thing?id=${game}&type=boardgame,boardgameexpansion&stats=1`
          );
          const xmlData = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlData, "application/xml");

          const titleElement = xmlDoc.querySelector("item name");
          const title = titleElement ? titleElement.getAttribute("value") : "";

          const imageElement = xmlDoc.querySelector("item image");
          const image = imageElement ? imageElement.textContent : "";

          gameArray.push({ name: title, image: image, id: game });
        })
      );
      console.log(gameArray);
      setImgData(gameArray);
    };

    if (bgData.length >= 0) {
      fetchGameInfo();
    }
  }, [bgData]);
  return (
    <div className="profile">
      <div className="profileContainer">
        <div className="profilePic">{profileName}</div>
        <div className="profileName"> {userData.username} </div>
        <div className="profileEmail">{userData.email}</div>
      </div>
      <div className="profileInfo"></div>
      <div className="collection">
        {/* <div className="carouselTitle">Your Games</div> */}
        <div className="collectionBox">
          {imgData.map((game) => {
            return (
              <div className="collectionContainer">
                <div className="collectionImage" onClick={handleClick}>
                  <img
                  id={game.id}
                    src={game.image}
                    alt={game.title}
                    className="boardGameImage"
                  />
                </div>
                <div className="collectionTitle" id={game.id} onClick={handleClick} >{game.title}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="collectionText">
        {" "}
        <a id="collectionTextStyle" href="/collection">
          View All Games In Your Collection {">"}
        </a>
      </div>
    </div>
  );
}
export default Profile;
