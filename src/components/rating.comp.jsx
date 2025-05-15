import { useState, useEffect } from "react";
import {
  setMovieStar,
  setSerieStar,
  getMovieStars,
  getSerieStars,
} from "../services/rating";

export function Rating({ id, type = "movie" }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    let stars = type === "series" ? getSerieStars() : getMovieStars();
    if (stars && stars[id]) {
      setRating(stars[id]);
    }
  }, [id, type]);

  const handleSetRating = (value) => {
    setRating(value);
    if (type === "series") {
      setSerieStar(id, value);
    } else {
      setMovieStar(id, value);
    }
  };

  return (
    <div className="rating flex gap-1">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`cursor-pointer text-lg ${
            rating > index ? "text-yellow-400" : "text-gray-500"
          }`}
          onClick={() => handleSetRating(index + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
