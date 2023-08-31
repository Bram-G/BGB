import { React, useState, useEffect } from "react";
import "./style.css";

function CarouselCard(props) {
    return(
        <div className="carouselCard">
            <a href={`/search/${props.link}`}>

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