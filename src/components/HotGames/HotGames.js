import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselCard from "../CarouselCard/CarouselCard";
import reload from "./assets/reload.png";

function HotGames() {
  const [hotGameArray, setHotGameArray] = useState([]);
  const [hotGameIdArray, setHotGameIdArray] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const fetchHotData = async () => {
    try {
      const response = await fetch(
        `https://boardgamegeek.com/xmlapi2/hot?type=boardgame`
      );
      const xmlData = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, "application/xml");
      const items = xmlDoc.getElementsByTagName("item");

      const gameArray = [];
      const idArray = [];

      for (let i = 0; i < items.length; i++) {
        const id = items[i].getAttribute("id");
        idArray.push(id);
      }
      // console.log(idArray);
      setHotGameIdArray(idArray);
      // console.log(hotGameIdArray);

      for (let i = 0; i < 35; i++) {
        const id = items[i].getAttribute("id");
        const name = items[i].querySelector("name").getAttribute("value");
        const rank = items[i].getAttribute("rank");

        const response = await fetch(
          `https://boardgamegeek.com/xmlapi2/thing?id=${id}&type=boardgame,boardgameexpansion&stats=1`
        );
        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "application/xml");
        // console.log(xmlDoc);
        const imageElement = xmlDoc.querySelector("item image");
        const image = imageElement ? imageElement.textContent : "";

        const unfilteredDescriptionElement =
          xmlDoc.querySelector("item description");
        const unfilteredDescription = unfilteredDescriptionElement
          ? unfilteredDescriptionElement.textContent
          : "";
        // console.log(unfilteredDescription);
        const nonLimitedDescription = unfilteredDescription.replace(
          /[/&#?(\d+);/]/g,
          "  "
        );
        const limitedDescription = limitDescription(nonLimitedDescription, 92);
        function limitDescription(description, maxLength) {
          if (description.length <= maxLength) {
            return description;
          } else {
            return description.slice(0, maxLength - 3) + "...";
          }
        }

        const minplayersElement = xmlDoc.querySelector("item minplayers");
        const minplayers = minplayersElement
          ? minplayersElement.getAttribute("value")
          : "";

        const maxplayersElement = xmlDoc.querySelector("item maxplayers");
        const maxplayers = maxplayersElement
          ? maxplayersElement.getAttribute("value")
          : "";

        const players = `${minplayers}-${maxplayers}`;

        const minplaytimeElement = xmlDoc.querySelector("item minplaytime");
        const minplaytime = minplaytimeElement
          ? minplaytimeElement.getAttribute("value")
          : "";

        const maxplaytimeElement = xmlDoc.querySelector("item maxplaytime");
        const maxplaytime = maxplaytimeElement
          ? maxplaytimeElement.getAttribute("value")
          : "";

        const time = `${minplaytime}-${maxplaytime}`;

        const gameData = {
          id: id,
          image: image,
          name: name,
          rank: rank,
          desc: limitedDescription,
          players: players,
          time: time,
        };

        gameArray.push(gameData);
        // console.log(gameArray);
      }
      setHotGameArray(gameArray);

      setFetchError(false);
    } catch (error) {
      console.log(error);
      setFetchError(true);
    }
  };

  useEffect(() => {
    fetchHotData();
  }, []);

  const retryHotFetch = async () => {
    try {
      // console.log("retrying fetch");
      const gameArray = [];
      // console.log(hotGameIdArray);

      for (let i = 0; i < hotGameIdArray.length; i++) {
        const id = hotGameIdArray[i];

        try {
          const response = await fetch(
            `https://boardgamegeek.com/xmlapi2/thing?id=${id}&type=boardgame,boardgameexpansion&stats=1`
          );

          const xmlData = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlData, "application/xml");

          const titleElement = xmlDoc.querySelector("item name");
          const name = titleElement ? titleElement.getAttribute("value") : "";

          const rankElement = xmlDoc.querySelector(
            "item statistics ratings average"
          );
          const rank = rankElement ? rankElement.getAttribute("value") : "";

          const imageElement = xmlDoc.querySelector("item image");
          const image = imageElement ? imageElement.textContent : "";

          const unfilteredDescriptionElement =
            xmlDoc.querySelector("item description");
          const unfilteredDescription = unfilteredDescriptionElement
            ? unfilteredDescriptionElement.textContent
            : "";
          // console.log(unfilteredDescription);
          const nonLimitedDescription = unfilteredDescription.replace(
            /[/&#?(\d+);/]/g,
            "  "
          );
          const limitedDescription = limitDescription(
            nonLimitedDescription,
            92
          );
          function limitDescription(description, maxLength) {
            if (description.length <= maxLength) {
              return description;
            } else {
              return description.slice(0, maxLength - 3) + "...";
            }
          }

          const minplayersElement = xmlDoc.querySelector("item minplayers");
          const minplayers = minplayersElement
            ? minplayersElement.getAttribute("value")
            : "";

          const maxplayersElement = xmlDoc.querySelector("item maxplayers");
          const maxplayers = maxplayersElement
            ? maxplayersElement.getAttribute("value")
            : "";

          const players = `${minplayers}-${maxplayers}`;

          const minplaytimeElement = xmlDoc.querySelector("item minplaytime");
          const minplaytime = minplaytimeElement
            ? minplaytimeElement.getAttribute("value")
            : "";

          const maxplaytimeElement = xmlDoc.querySelector("item maxplaytime");
          const maxplaytime = maxplaytimeElement
            ? maxplaytimeElement.getAttribute("value")
            : "";

          const time = `${minplaytime}-${maxplaytime}`;

          const gameData = {
            id: id,
            image: image,
            name: name,
            rank: rank,
            desc: limitedDescription,
            players: players,
            time: time,
          };

          gameArray.push(gameData);
          // console.log(gameArray);
        } catch (error) {
          console.log(`error fetching data for ID ${id}`, error);
        }
      }
      setHotGameArray(gameArray);
      // console.log(hotGameArray);
      setFetchError(false);
    } catch (error) {
      console.log(error);
      // console.log("this is where it is ending");
      setFetchError(true);
    }
  };

  const responsive = {
    wideDesktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 5,
      slidesToSlide: 5, // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 2000, min: 1600 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    laptop: {
      breakpoint: { max: 1200, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 800, min: 500 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    smallmobile: {
      breakpoint: { max: 550, min: 200 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div>
      <div className="hotGamesContainer">
        <div className="hotGamesView">
          <div className="carouselTitle">Hot Games</div>
          {fetchError ? (
            <div id="errorButtonContainer">
              <div className="quickInfoText">
                Error fetching data. Please try again.
              </div>
              <button className="retryButton" onClick={retryHotFetch}>
                <img className="retryImage" src={reload} alt="retry"></img>
              </button>
            </div>
          ) : (
            <Carousel
              centerMode={false}
              responsive={responsive}
              autoPlay={false}
              autoPlaySpeed={10000}
              swipeable={true}
              draggable={true}
              showDots={false}
              infinite={true}
              partialVisible={false}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px carousel-item2"
            >
              {hotGameArray.map((gameResult) => {
                return (
                  <div key={gameResult.id} className="hotGame">
                    <CarouselCard
                      desc={gameResult.desc}
                      rank={gameResult.rank}
                      id={gameResult.id}
                      name={gameResult.name}
                      image={gameResult.image}
                      link={gameResult.id}
                      age={gameResult.age}
                      players={gameResult.players}
                      time={gameResult.time}
                    ></CarouselCard>
                  </div>
                );
              })}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
}

export default HotGames;
