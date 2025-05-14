import React from "react";
import Card from "./Card";

const CardList = ({ cards }) => {
  const handleWatch = (movie, listType) => {
    const watchlist = JSON.parse(localStorage.getItem(listType)) || [];
    const movieData = {
      id: movie.id, //Verwendung der echten ID
      title: movie.title,
      image: movie.img,
      overview: movie.overview,
      year: movie.year,
      genres: movie.genres,
    };

    const alreadyExists = watchlist.find((m) => m.id === movieData.id);
    if (!alreadyExists) {
      watchlist.push(movieData);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      alert(
        `${movie.title} wurde der ${
          listType === "watchlist" ? "Watchlist" : "OnWatchlist"
        } hinzugefügt!`
      );
    } else {
      alert(
        `${movie.title} war bereits in der ${
          listType === "watchlist" ? "Watchlist" : "OnWatchlist"
        }.`
      );
    }
  };

  if (!cards || cards.length === 0) {
    return <p>"Es gibt keine Elemente zum Anzeigen."</p>;
  }

  return (
    <div className="card-list">
      {cards.map((card) => (
        <Card
          key={card.id}
          image={card.img}
          title={card.title}
          overview={card.overview}
          year={card.year}
          genres={card.genres}
          onWatch={() => handleWatch(card, "onWatchlist")} // Senden der Funktion handleOnWatch an Card Card
          handleWatch={() => handleWatch(card, "watchlist")} // Senden der Funktion handleOnWatch an Card
        />
      ))}
    </div>
  );
};

export default CardList;
