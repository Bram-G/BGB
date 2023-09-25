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
          const data = await API.getSingleUser(response.user.id);
          setBGData(data.bg_collection);
          setUserData(data);
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

  const handleClick = (event) => {
    const itemId = event.target.id;
    localStorage.setItem("gameSearchTerm", itemId);

    // Redirect the browser to the "/search/{id}" URL
    window.location.href = `/search/${itemId}`;
  };
  const handleEdit = (event) => {
    window.location.href = `/editprofile`;

  }

  const handleCollectionImport = async () => {
    try {
      prompt("Please enter your BGG username");
      const response = await "/xmlapi2/collection?parameters";
      console.log(response);
    } catch (err) {} };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const fetchGameInfo = async () => {
      const gameArray = [];

      // console.log(onlyCapitalLetters(userData.username));
      function onlyCapitalLetters(str) {
          const userIconText = str
          const onlyCapsUserIcon = userIconText.replace(/[^A-Z]+/g, "");
          if (onlyCapsUserIcon.length < 1) {
            const firstLetter = userIconText.charAt(0);
            setProfileName(firstLetter);
            return;
          }else{
            setProfileName(onlyCapsUserIcon);

          }
      }
      onlyCapitalLetters(userData.username);
      

      await Promise.all(
        bgData.slice(0, 3).map(async (game) => {
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
      // console.log(gameArray);
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
        <div className="profileName">
          {" "}
          {userData.username}{" "}
          <svg
          onClick={handleEdit}
          id="editIcon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="create">
              <path
                id="Vector"
                d="M2.99878 17.2513V21.0013H6.74878L17.8088 9.94128L14.0588 6.19128L2.99878 17.2513ZM20.7088 7.04128C21.0988 6.65128 21.0988 6.02128 20.7088 5.63128L18.3688 3.29128C17.9788 2.90128 17.3488 2.90128 16.9588 3.29128L15.1288 5.12128L18.8788 8.87128L20.7088 7.04128Z"
                fill="#3D3A39"
              />
            </g>
          </svg>{" "}
        </div>
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
                  key={game.id}
                    id={game.id}
                    src={game.image}
                    alt={game.title}
                    className="boardGameImage"
                  />
                </div>
                <div
                  className="collectionTitle"
                  id={game.id}
                  onClick={handleClick}
                >
                </div>
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
