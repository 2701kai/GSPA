import { useEffect, useState } from "react";
import { getMovies } from "../services/api";
import CardList from "../components/CardList";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🎬 Filme</h2>

      <input
        type="text"
        placeholder="Nach Film suchen..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full md:w-1/3 px-4 py-2 mb-6 border rounded-md shadow-sm"
      />

      <CardList cards={filteredMovies} />
    </div>
  );
}
