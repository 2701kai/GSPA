import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/api";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieById(Number(id));
        setMovie(data);
      } catch (error) {
        setMovie(null);
      }
    }
    fetchMovie();
  }, [id]);

  if (!movie) return <div>Film nicht gefunden...</div>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Jahr: {movie.year}</p>
      <p>Genres: {movie.genres && movie.genres.join(", ")}</p>
      {movie.img && (
        <img src={movie.img} alt={movie.title} style={{ maxWidth: 300 }} />
      )}
      {movie.img_backdrop && (
        <img
          src={movie.img_backdrop}
          alt={movie.title + " backdrop"}
          style={{ maxWidth: 300 }}
        />
      )}
    </div>
  );
}
