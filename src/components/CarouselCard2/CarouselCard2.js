import { React } from "react";
import "./style.css";

function CarouselCard(props) {
  function handleClick() {
    console.log("Clicked");
    localStorage.setItem("gameSearchTerm", props.name);
  }

  return (
    
    <a key={props.id} href={`/search/${props.link}`} onClick={handleClick} className="carouselCard">
      <div className="rank">{props.rank}</div>
      <div className="carouselCardImageContainer">
        <img
          className="carouselCardImage"
          src={props.image}
          alt={props.name}
        />
      </div>
      <div className="carouselCardTitle">{props.name}</div>
    </a>

    // <div key={props.id} className="carouselCard">
    //   <div className="rank">{props.rank}</div>

    //   <a href={`/search/${props.link}`} onClick={handleClick} className="imgATag">
    //     <div className="carouselCardImageContainer">
    //       <img
    //         className="carouselCardImage"
    //         src={props.image}
    //         alt="placeholder"
    //       />
    //     </div>

    //   </a>
    //     <div className="carouselCardTitle">{props.name}</div>
    // </div>
  );
}

export default CarouselCard;
