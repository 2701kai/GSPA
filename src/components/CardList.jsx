import { useState, useEffect } from "react";
import Card from "./Card";
import { WatchButton } from "./watch.comp";
import { getAllMovieIds, getAllSeriesIds } from "../services/localstorage";
import {
  saveMovieById,
  removeMovieById,
  saveSeriesById,
  removeSeriesById,
} from "../services/api";

const CardList = ({ cards, type }) => {
  const [watchedIds, setWatchedIds] = useState([]);

  useEffect(() => {
    if (type === "series") {
      setWatchedIds(getAllSeriesIds());
    } else {
      setWatchedIds(getAllMovieIds());
    }
  }, [cards, type]);

  const toggleWatch = async (card) => {
    if (watchedIds.includes(card.id)) {
      if (type === "series") {
        await removeSeriesById(card.id);
        setWatchedIds((ids) => ids.filter((id) => id !== card.id));
      } else {
        await removeMovieById(card.id);
        setWatchedIds((ids) => ids.filter((id) => id !== card.id));
      }
    } else {
      if (type === "series") {
        await saveSeriesById(card.id);
        setWatchedIds((ids) => [...ids, card.id]);
      } else {
        await saveMovieById(card.id);
        setWatchedIds((ids) => [...ids, card.id]);
      }
    }
  };

  if (!cards || cards.length === 0) {
    return <p>Es gibt keine Elemente zum Anzeigen.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {cards.map((card) => (
        <Card
          type={type}
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
