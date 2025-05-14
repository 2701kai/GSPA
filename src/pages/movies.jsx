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
      <h2>Filme</h2>
      <CardList cards={movies} />
    </div>
  );
}
