import React, { useState } from "react";

const Card = ({ image, title, overview, year, genres, onWatch }) => {
  const [rating, setRating] = useState(0);
  const [isOnWatch, setIsOnWatch] = useState(false);

  const handleOnWatch = () => {
    const onWatchlist = JSON.parse(localStorage.getItem("onWatchlist")) || [];

    const movieData = {
      title,
      image,
      overview,
      year,
      genres,
    };

    const exists = onWatchlist.find((m) => m.title === title);

    if (exists) {
      const updatedList = onWatchlist.filter((m) => m.title !== title);
      localStorage.setItem("onWatchlist", JSON.stringify(updatedList));
      setIsOnWatch(false);
      alert(`${title} Der Zuschauermodus wurde beendet.`);
    } else {
      onWatchlist.push(movieData);
      localStorage.setItem("onWatchlist", JSON.stringify(onWatchlist));
      setIsOnWatch(true);
      alert(`${title} Zur Zuschauermodus hinzugefügt.`);
    }
  };

  return (
    <div className="card bg-neutral text-neutral-content p-4 rounded-lg shadow-md">
      <img src={image} alt={title} className="card-image rounded-md mb-2" />
      <h2 className="card-title text-xl font-bold">{title}</h2>
      <p className="card-overview text-sm mt-1">{overview}</p>
      <p className="card-year text-xs mt-1">Year: {year}</p>
      <p className="card-genres text-xs text-gray-400 mb-2">
        Genres: {genres.join(", ")}
      </p>

      <div className="flex items-center justify-between mt-2">
        <button
          onClick={onWatch}
          className="watch-button bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
        >
          Watch
        </button>
        <button
          onClick={handleOnWatch}
          className={`onwatch-button ${
            isOnWatch ? "bg-green-600" : "bg-gray-500"
          } hover:bg-green-700 text-white px-3 py-1 rounded-md`}
        >
          {isOnWatch ? "On Watching" : "Mark as Watching"}
        </button>

        <div className="rating flex gap-1">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`cursor-pointer text-lg ${
                rating > index ? "text-yellow-400" : "text-gray-500"
              }`}
              onClick={() => setRating(index + 1)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
