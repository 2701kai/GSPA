// path=Gruppenprojekt-SPA/src/components/CardList.jsx
import React from "react";
import Card from "./Card";
import cardData from "../data";

const CardList = () => {
  return (
    <div className="card-list">
      {cardData.map((card) => (
        <Card
          key={card.id}
          image={card.image}
          title={card.title}
          overview={card.overview}
          year={card.year}
          genres={card.genres}
        />
      ))}
    </div>
  );
};

export default CardList;
