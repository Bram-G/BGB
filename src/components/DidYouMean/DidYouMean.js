import { React, useState, useEffect } from "react";
import "./style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselCard from "../CarouselCard/CarouselCard";

function DidYouMean(props) {
  const [gameSearchArray, setGameSearchArray] = useState([]);
  const [gameSearchExpansionArray, setGameSearchExpansionArray] = useState([]);
  const [gameSearchFinalExpansionArray, setGameSearchFinalExpansionArray] = useState([]);
  // const [style, setStyle] = useState({ display: "block" });

  const gameID = window.location.pathname.split("/")[2];

  const fetchSecondaryData = async () => {
    try {
      const arrayOfSimilarGames = [];
      // grabbing the search term from local storage
      const gameSearchTerm = localStorage.getItem("gameSearchTerm");
      // getting the search results from BGG
      const response = await fetch(
        `https://boardgamegeek.com/xmlapi2/search?parameters&query=${gameSearchTerm}&type=boardgame`
        );
        // parsing the results
        const xmlResponse = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlResponse, "application/xml");
      const items = xmlDoc.getElementsByTagName("item");
      // if length greater than 0, iterate through the results and push the IDs to an array
      if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          const name = items[i].getAttribute("id");
          
            arrayOfSimilarGames.push(name);
        }
        localStorage.setItem("gameSearchArray", arrayOfSimilarGames);
        console.log("Array of Similar Games" + arrayOfSimilarGames);
      } else {
        console.log("No search results found");
      }
      console.log("fetchSecondaryData");
      const gameSearchArray = localStorage.getItem("gameSearchArray");
      // checking if the array is empty
      if (gameSearchArray.length > 0) {
        console.log("array is not empty");
        // Construct the API URL using the IDs from local storage
        const apiUrl = `https://boardgamegeek.com/xmlapi2/thing?parameters&id=${gameSearchArray}&type=boardgame&stats=1`;

        // Make the API request
        await fetch(apiUrl)
          .then((response) => response.text())
          .then((xmlResponse) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");

            // Extract each item element from the XML
            const items = xmlDoc.querySelectorAll("item");

            const gameResults = [];
            var gameExpansionIDResults = [];

            // Iterate through each item element and extract information

            items.forEach((item) => {
              const id = item.getAttribute("id");
              const name = item
                .querySelector('name[type="primary"]')
                .getAttribute("value");
              const imageElement = item.querySelector("image");
              const image = imageElement ? imageElement.textContent : "";
              const rankElement = xmlDoc.querySelector(
                "item statistics ratings average"
              );
              const rank = rankElement ? rankElement.getAttribute("value") : "";
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

              const minplaytimeElement =
                xmlDoc.querySelector("item minplaytime");
              const minplaytime = minplaytimeElement
                ? minplaytimeElement.getAttribute("value")
                : "";

              const maxplaytimeElement =
                xmlDoc.querySelector("item maxplaytime");
              const maxplaytime = maxplaytimeElement
                ? maxplaytimeElement.getAttribute("value")
                : "";

              const time = `${minplaytime}-${maxplaytime}`;

              const linkElements = xmlDoc.querySelectorAll(
                'link[type="boardgameexpansion"]'
              );
              const gameExpansionResults = new Set();

              linkElements.forEach((linkElement) => {
                const expansionId = linkElement.getAttribute("id");
                gameExpansionResults.add(expansionId);
              });

              // Convert the Set to an array if needed
              const uniqueExpansionIds = Array.from(gameExpansionResults);

              gameExpansionIDResults = uniqueExpansionIds.join(",");

              setGameSearchExpansionArray(gameExpansionIDResults);

              const gameResult = {
                id: id,
                image: image,
                name: name,
                rank: rank,
                desc: limitedDescription,
                players: players,
                time: time,
              };

              // Push the object to the gameResults array

              gameResults.push(gameResult);
            });

            setGameSearchArray(gameResults);
          });
      } else if (gameSearchArray.length < 1) {
        console.log("array is empty");
        // setStyle({ display: "none" });
      }

      console.log(gameSearchExpansionArray);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTertiaryData = async () => {
    const expansionApiUrl = `https://boardgamegeek.com/xmlapi2/thing?parameters&id=${gameSearchExpansionArray}&stats=1`;
    fetch(expansionApiUrl)
      .then((response) => response.text())
      .then((xmlResponse) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");

        // Extract each item element from the XML
        const items = xmlDoc.querySelectorAll("item");

        const expansionGameResults = [];

        // Iterate through each item element and extract information
        items.forEach((item) => {
          const name = item
            .querySelector('name[type="primary"]')
            .getAttribute("value");
          const id = item.getAttribute("id");
          const imageElement = item.querySelector("image");
          const image = imageElement ? imageElement.textContent : "";
          const rankElement = xmlDoc.querySelector(
            "item statistics ratings average"
          );
          const rank = rankElement ? rankElement.getAttribute("value") : "";
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
            100
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

          const expansionGameResult = {
            id: id,
            image: image,
            name: name,
            rank: rank,
            desc: limitedDescription,
            players: players,
            time: time,
          };

          // Push the object to the gameResults array
          expansionGameResults.push(expansionGameResult);
        });

        setGameSearchFinalExpansionArray(expansionGameResults);
        console.log(gameSearchFinalExpansionArray);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSecondaryData();
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Use the gameSearchExpansionArray as a dependency
    const fetchTertiary = async () => {
      if (gameSearchExpansionArray.length > 0) {
        await fetchTertiaryData();
      }
    };

    fetchTertiary();
  }, [gameSearchExpansionArray]);

  const filteredGameSearchArray = gameSearchArray.filter((gameResult) => gameResult.id !== gameID);
  console.log(gameSearchArray);

  // Conditionally render the component based on gameSearchArray length
  const shouldRenderOtherGamesCarousel = filteredGameSearchArray.length > 0;
  const shouldRenderExpansionCarousel = gameSearchFinalExpansionArray.length > 0;


  const responsive = {
    wideDesktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 5,
      slidesToSlide: 5, // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 2000, min: 1600 },
      items: 4,
      slidesToSlide: 5, // optional, default to 1.
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
  };

  return (
    <div className="carouselContainer">
      {shouldRenderOtherGamesCarousel && (
      <div className="otherGamesCarousel">

      
      <div className="carouselTitle">Other Games</div>
      <Carousel
        centerMode={false}
        responsive={responsive}
        autoPlay={false}
        autoPlaySpeed={4000}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px carousel-item2"
      >
        {filteredGameSearchArray.map((gameResult) => {
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
      
      </div>
      )  }


      {shouldRenderExpansionCarousel && (
      <div className="expansionCarousel">

      
      <div className="carouselTitle">Expansions</div>

      <Carousel
        centerMode={false}
        className="expansionCarousel"
        responsive={responsive}
        autoPlay={false}
        autoPlaySpeed={4000}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px carousel-item2"
      >
        {gameSearchFinalExpansionArray.map((gameExpansionResult) => {
          return (
            <div key={gameExpansionResult.id} className="hotGame">
              <CarouselCard
                id={gameExpansionResult.id}
                image={gameExpansionResult.image}
                name={gameExpansionResult.name}
                rank={gameExpansionResult.rank}
                desc={gameExpansionResult.desc}
                players={gameExpansionResult.players}
                time={gameExpansionResult.time}
                link={gameExpansionResult.id}
              ></CarouselCard>
            </div>
          );
        })}
      </Carousel>
    </div>
      )}
    </div>
      
  );
}

export default DidYouMean;
