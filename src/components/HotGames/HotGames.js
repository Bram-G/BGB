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
                return description.slice(0, maxLength - 3) + '...';
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
                time: time
            }
            
            gameArray.push(gameData);
            // console.log(gameArray);
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
    wideDesktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 5,
      slidesToSlide: 5 // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 2000, min: 1600 },
      items: 4,
      slidesToSlide: 5 // optional, default to 1.
    },
    laptop: {
      breakpoint: { max: 1200, min: 1024 },
      items: 3,
      slidesToSlide: 3// optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 800, min: 500 },
      items: 2,
      slidesToSlide: 2// optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    }
  };

  return (
    <div>
      <div className="hotGamesContainer">
        <div className="hotGamesView">
          <div className="carouselTitle">Hot Games</div>
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
            <div key={gameResult.id} className="hotGame"  > 
                

            <CarouselCard
            
            desc = {gameResult.desc}
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
