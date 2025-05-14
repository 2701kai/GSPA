import { useState, useEffect } from "react";
import Card from "./Card";
import { WatchButton } from "./watch.comp";
import {
  getAllMovieIds,
  saveMovie,
  removeMovie,
  getAllSeriesIds,
  saveSeries,
  removeSeries,
} from "../services/localstorage";

const CardList = ({ cards, type }) => {
  const [watchedIds, setWatchedIds] = useState([]);

  useEffect(() => {
    if (type === "series") {
      setWatchedIds(getAllSeriesIds());
    } else {
      setWatchedIds(getAllMovieIds());
    }
  }, [cards, type]);

  const toggleWatch = (card) => {
    if (watchedIds.includes(card.id)) {
      if (type === "series") {
        removeSeries(card.id);
        setWatchedIds((ids) => ids.filter((id) => id !== card.id));
      } else {
        removeMovie(card.id);
        setWatchedIds((ids) => ids.filter((id) => id !== card.id));
      }
    } else {
      if (type === "series") {
        saveSeries({
          id: card.id,
          title: card.title,
          img: card.img,
          overview: card.overview,
          year: card.year,
          genres: card.genres,
        });
        setWatchedIds((ids) => [...ids, card.id]);
      } else {
        saveMovie({
          id: card.id,
          title: card.title,
          img: card.img,
          overview: card.overview,
          year: card.year,
          genres: card.genres,
        });
        setWatchedIds((ids) => [...ids, card.id]);
      }
    }
  };

  if (!cards || cards.length === 0) {
    return <p>Es gibt keine Elemente zum Anzeigen.</p>;
  }

  return (
    <div className="card-list">
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          image={card.img}
          title={card.title}
          overview={card.overview}
          year={card.year}
          genres={card.genres}
          watchButton={
            <WatchButton
              isWatched={watchedIds.includes(card.id)}
              onToggle={() => toggleWatch(card)}
            />
          }
        />
      ))}
    </div>
  );
};

export default CardList;
