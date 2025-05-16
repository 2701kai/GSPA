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
  const [watchedMovieIds, setWatchedMovieIds] = useState([]);
  const [watchedSeriesIds, setWatchedSeriesIds] = useState([]);

  useEffect(() => {
    setWatchedMovieIds(getAllMovieIds());
    setWatchedSeriesIds(getAllSeriesIds());
  }, [cards]);

  const toggleWatch = async (card) => {
    if (card.type === "series") {
      if (watchedSeriesIds.includes(card.id)) {
        await removeSeriesById(card.id);
        setWatchedSeriesIds((ids) => ids.filter((id) => id !== card.id));
      } else {
        await saveSeriesById(card.id);
        setWatchedSeriesIds((ids) => [...ids, card.id]);
      }
    } else {
      if (watchedMovieIds.includes(card.id)) {
        await removeMovieById(card.id);
        setWatchedMovieIds((ids) => ids.filter((id) => id !== card.id));
      } else {
        await saveMovieById(card.id);
        setWatchedMovieIds((ids) => [...ids, card.id]);
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
          type={card.type}
          key={card.id}
          id={card.id}
          image={card.img}
          title={card.title}
          overview={card.overview}
          year={card.year}
          genres={card.genres}
          watchButton={
            <WatchButton
              isWatched={
                card.type === "series"
                  ? watchedSeriesIds.includes(card.id)
                  : watchedMovieIds.includes(card.id)
              }
              onToggle={() => toggleWatch(card)}
            />
          }
        />
      ))}
    </div>
  );
};

export default CardList;
