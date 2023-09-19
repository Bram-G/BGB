import { React } from "react";
import "./style.css";

function CarouselCard(props) {

function handleClick () {
    console.log("Clicked")
    localStorage.setItem("gameSearchTerm",(props.name));
}

    return(
        <div key={props.key} className="carouselCard">
            <a href={`/search/${props.link}`} onClick={handleClick}>

            <div className="carouselCardImageContainer">
                <img className="carouselCardImage" src={props.image} alt="placeholder"/>
            </div>
            <div className="carouselCardTitle">
                {props.name}
                </div>
            </a>
        </div>
    )
}

export default CarouselCard;