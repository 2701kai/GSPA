// path=Gruppenprojekt-SPA/src/components/Card.jsx
import React from "react";

const Card = ({ image, title, overview, year, genres }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h2 className="card-title">{title}</h2>
      <p className="card-overview">{overview}</p>
      <p className="card-year">Year: {year}</p>
      <p className="card-genres">Genres: {genres.join(", ")}</p>
      <button className="watch-button">Watch</button>
      <div className="rating">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="star">
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
