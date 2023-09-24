import { React } from "react";
import "./style.css";

function CarouselCard(props) {
  function handleClick() {
    console.log("Clicked");
    localStorage.setItem("gameSearchTerm", props.name);
  }

  return (
    <a
      key={props.id}
      href={`/search/${props.link}`}
      onClick={handleClick}
      className="carouselCard"
    >
      <img src={props.image} className="carouselGameImg"></img>
      <div className="carouselBottom">
        <div className="carouselBottomInfo">
          <div className="carouselGameName">{props.name}</div>
          <div className="carouselGameDesc">{props.desc}</div>
          <div className="carouselAuxInfo">
            <div className="carouselGameRank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M15 6.125L17.1469 8.27187L12.5719 12.8469L8.82187 9.09688L1.875 16.0531L3.19688 17.375L8.82187 11.75L12.5719 15.5L18.4781 9.60313L20.625 11.75V6.125H15Z"
                  fill="#B22A2F"
                />
              </svg>
              &nbsp;
              {props.rank}
            </div>
            <div className="carouselGamePlayers">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M15.5 10.3125C17.0562 10.3125 18.3031 9.05625 18.3031 7.5C18.3031 5.94375 17.0562 4.6875 15.5 4.6875C13.9438 4.6875 12.6875 5.94375 12.6875 7.5C12.6875 9.05625 13.9438 10.3125 15.5 10.3125ZM8 10.3125C9.55625 10.3125 10.8031 9.05625 10.8031 7.5C10.8031 5.94375 9.55625 4.6875 8 4.6875C6.44375 4.6875 5.1875 5.94375 5.1875 7.5C5.1875 9.05625 6.44375 10.3125 8 10.3125ZM8 12.1875C5.81563 12.1875 1.4375 13.2844 1.4375 15.4688V17.8125H14.5625V15.4688C14.5625 13.2844 10.1844 12.1875 8 12.1875ZM15.5 12.1875C15.2281 12.1875 14.9187 12.2063 14.5906 12.2344C15.6781 13.0219 16.4375 14.0812 16.4375 15.4688V17.8125H22.0625V15.4688C22.0625 13.2844 17.6844 12.1875 15.5 12.1875Z"
                  fill="#B22A2F"
                />
              </svg>
              &nbsp;
              {props.players}
            </div>
            <div className="carouselGameTime">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M11.2406 1.875C6.06562 1.875 1.875 6.075 1.875 11.25C1.875 16.425 6.06562 20.625 11.2406 20.625C16.425 20.625 20.625 16.425 20.625 11.25C20.625 6.075 16.425 1.875 11.2406 1.875ZM11.25 18.75C7.10625 18.75 3.75 15.3938 3.75 11.25C3.75 7.10625 7.10625 3.75 11.25 3.75C15.3938 3.75 18.75 7.10625 18.75 11.25C18.75 15.3938 15.3938 18.75 11.25 18.75Z"
                  fill="#B22A2F"
                />
                <path
                  d="M11.7188 6.5625H10.3125V12.1875L15.2344 15.1406L15.9375 13.9875L11.7188 11.4844V6.5625Z"
                  fill="#B22A2F"
                />
              </svg>
              &nbsp;
              {props.time}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default CarouselCard;
