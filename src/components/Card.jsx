import { useState } from "react";
import { Link } from "react-router-dom";
import { Rating } from "./rating.comp";

const Card = ({
  id,
  type = "movies",
  image,
  title,
  overview,
  year,
  genres,
  watchButton,
}) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="bg-white text-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 duration-200">
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{overview}</p>
        <p className="text-xs text-gray-500">Jahr: {year}</p>
        <p className="text-xs text-gray-500">Genres: {genres.join(", ")}</p>

        <div className="flex justify-between items-center pt-2 gap-2">
          {watchButton}
          <Link
            className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
            to={`/${type}/${id}`}
          >
            Details
          </Link>
          <Rating id={id} type={type} />
        </div>
      </div>
    </div>
  );
};

export default Card;
