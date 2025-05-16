import { useEffect, useState } from "react";
import { getMovies } from "../services/api";
import CardList from "../components/CardList";
import SearchInput from "../components/search.comp";
import Sort from "../components/sort.comp";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [sortKey, setSortKey] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getMovies(page);
        setMovies(data);
      } catch (error) {
        console.error("Fehler beim Laden der Filme:", error);
      }
    }
    fetchMovies();
  }, [page]);

  const filteredMovies = movies
    .filter((m) => m.title.toLowerCase().includes(searchValue.toLowerCase()))
    .sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      return sortOrder === "asc"
        ? aVal > bVal
          ? 1
          : -1
        : aVal < bVal
        ? 1
        : -1;
    });

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">🎬 Filme</h2>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-4 mb-6">
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <Sort
          sortKey={sortKey}
          setSortKey={setSortKey}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>

      <CardList cards={filteredMovies} />

      <div className="flex justify-center mt-8 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          ◀️ Zurück
        </button>
        <span className="px-4 py-2 font-medium">Seite {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Weiter ▶️
        </button>
      </div>
    </div>
  );
}
