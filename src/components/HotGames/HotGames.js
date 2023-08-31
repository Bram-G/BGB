import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselCard from "../CarouselCard/CarouselCard";

function HotGames() {

    const [hotGameArray, setHotGameArray] = useState([]);
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

        for (let i = 0; i < items.length; i++) {
            const id = items[i].getAttribute("id");
            const image = items[i].querySelector("thumbnail").getAttribute("value");
            const name = items[i].querySelector("name").getAttribute("value");
            const rank = items[i].getAttribute("rank");

            const gameData = {
                id: id,
                image: image,
                name: name,
                rank: rank,
            }
            
            gameArray.push(gameData);
            console.log(gameArray);
        }
        setHotGameArray(gameArray);


    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotData();
  }, []);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
      slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 8,
      slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 5,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <div>
      <div className="hotGamesContainer">
        <div className="hotGamesView">
          <div className="carouselTitle">Hot Games</div>
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
        {hotGameArray.map((gameResult) => {
          return (
            <div className="hotGame"> 
                <div className="rank">{gameResult.rank}</div>

            <CarouselCard
              key={gameResult.id}
              name={gameResult.name}
              image={gameResult.image}
              link={gameResult.id}
              ></CarouselCard>
              </div>
          );
        })}
      </Carousel>
          {/* {hotGameArray.map((game) => { 
            return ( 
            <div className="hotGamesCard">
              <div className="hotGamesRank">{game.rank}</div>
              <div className="hotGamesImage"><img src={game.image}></img></div>
              <div className="hotGamesName">{game.name}</div>
            </div>
            )
          })} */}
        </div>
      </div>
    </div>
  );
}

export default HotGames;
