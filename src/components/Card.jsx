import { useState } from "react";

const Card = ({ image, title, overview, year, genres, watchButton }) => {
  const [rating, setRating] = useState(0);

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
        {watchButton}
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
