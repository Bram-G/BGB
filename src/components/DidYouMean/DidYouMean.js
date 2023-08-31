import { React, useState, useEffect } from "react";
import "./style.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselCard from "../CarouselCard/CarouselCard";

function DidYouMean() {
  const [gameSearchArray, setGameSearchArray] = useState([]);
  const [gameSearchExpansionArray, setGameSearchExpansionArray] = useState([]);
  const [gameSearchFinalExpansionArray, setGameSearchFinalExpansionArray] = useState([]);

  useEffect(() => {
    const fetchSecondaryData = async () => {
      try {
        // console.log("fetchSecondaryData");
        // Assuming your IDs are stored as an array in local storage
        const gameSearchArray = localStorage.getItem("gameSearchArray");

        // Construct the API URL using the IDs from local storage
        const apiUrl = `https://boardgamegeek.com/xmlapi2/thing?parameters&id=${gameSearchArray}&type=boardgame`;

        // Make the API request
        fetch(apiUrl)
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
              const name = item
                .querySelector('name[type="primary"]')
                .getAttribute("value");
              const id = item.getAttribute("id");
              const imageElement = item.querySelector("image");
              const image = imageElement ? imageElement.textContent : "";

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

              const gameResult = {
                name: name,
                id: id,
                image: image,
              };

              // Push the object to the gameResults array
              gameResults.push(gameResult);
            });
            setGameSearchArray(gameResults);
            // console.log(gameExpansionIDResults);
            setGameSearchExpansionArray(gameExpansionIDResults);
            // Now you have an array of game results to parse through later
            //   console.log(gameResults);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (error) {}
    };

    const fetchExpansionData = async () => {
      try {
        // console.log("fetchExpansionData");
        // console.log(gameSearchExpansionArray);
        const apiUrl = `https://boardgamegeek.com/xmlapi2/thing?parameters&id=${gameSearchExpansionArray}`;

        // Make the API request
        fetch(apiUrl)
          .then((response) => response.text())
          .then((xmlResponse) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlResponse, "text/xml");
            const gameExpansionFinalResults = [];

            // Extract each item element from the XML
            const items = xmlDoc.querySelectorAll("item");
            items.forEach((item) => {
              const expansionName = item
                .querySelector('name[type="primary"]')
                .getAttribute("value");
              const expansionId = item.getAttribute("id");
              const expansionImageElement = item.querySelector("image");
              const expansionImage = expansionImageElement
                ? expansionImageElement.textContent
                : "";

              const gameExpansionResult = {
                name: expansionName,
                id: expansionId,
                image: expansionImage,
              };
              // console.log("expansionName" + gameExpansionResult);
              gameExpansionFinalResults.push(gameExpansionResult);
            });
            setGameSearchFinalExpansionArray(gameExpansionFinalResults);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (error) {}
    };

    // console.log("gameExpansionFinalResults" + gameSearchFinalExpansionArray);
    fetchSecondaryData();
    fetchExpansionData();
  }, [gameSearchExpansionArray, gameSearchFinalExpansionArray]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  return (
    <div className="carouselContainer">
      <div className="carouselTitle">Other Games</div>
      <Carousel
      centerMode={true}
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={3000}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {gameSearchArray.map((gameResult) => {
          return (
            <CarouselCard
              key={gameResult.id}
              name={gameResult.name}
              image={gameResult.image}
              link={gameResult.id}
            ></CarouselCard>
          );
        })}
      </Carousel>
        <div className="carouselTitle">Expansions</div>
      <Carousel
      centerMode={true}
      className="expansionCarousel"
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={3000}
      swipeable={true}
      draggable={true}
      showDots={true}
      infinite={true}
      partialVisible={false}
      dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {gameSearchFinalExpansionArray.map((gameExpansionResult) => {
          return (
            <CarouselCard
              key={gameExpansionResult.id}
              name={gameExpansionResult.name}
              image={gameExpansionResult.image}
              link={gameExpansionResult.id}
            ></CarouselCard>
          );
        })}
      </Carousel>
    </div>
  );
}

export default DidYouMean;
