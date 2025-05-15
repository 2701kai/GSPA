import { useEffect, useState } from "react";
import { getMovies } from "../services/api";
import CardList from "../components/CardList";

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
      <h2 className="text-2xl font-bold my-4 text-center text-blue-800">
        🎬 Filme
      </h2>

      <CardList cards={movies} />
    </div>
  );
}
