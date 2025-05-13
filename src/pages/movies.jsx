import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../services/api";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getMovies(1);
        setMovies(data);
      } catch (error) {
        console.error("Fehler beim Laden der Filme:", error);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Filme</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              {movie.title}
              {movie.img && (
                <img
                  src={movie.img}
                  alt={movie.title}
                  style={{ maxWidth: 300 }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
