import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../services/api";
import Card from "../components/Card"; // Import the Card component

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
      <div className="card-list">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            image={movie.img} // Assuming movie.img contains the image URL
            title={movie.title}
            overview={movie.overview}
            year={movie.year}
            genres={movie.genres}
          />
        ))}
      </div>
    </div>
  );
}
