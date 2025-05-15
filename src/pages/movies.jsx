import { useEffect, useState } from "react";
import { getMovies } from "../services/api";
import CardList from "../components/CardList";
import { getAllMovieIds } from "../services/localstorage";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [tab, setTab] = useState("all");
  const [watchedIds, setWatchedIds] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getMovies(page);
        setMovies(data);
        setWatchedIds(getAllMovieIds());
      } catch (error) {
        console.error("Fehler beim Laden der Filme:", error);
      }
    }
    fetchMovies();
  }, [page]);

  const filteredMovies = movies
    .filter((m) => m.title.toLowerCase().includes(query.toLowerCase()))
    .filter((m) => {
      if (tab === "watched") return watchedIds.includes(m.id);
      if (tab === "unwatched") return !watchedIds.includes(m.id);
      return true;
    })
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🎬 Filme</h2>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6">
        <input
          type="text"
          placeholder="Nach Film suchen..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm"
        />

        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="title">Sortieren nach Titel</option>
          <option value="year">Sortieren nach Jahr</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="asc">Aufsteigend</option>
          <option value="desc">Absteigend</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            tab === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("all")}
        >
          Alle
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            tab === "watched" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("watched")}
        >
          Gesehen
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            tab === "unwatched" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("unwatched")}
        >
          Ungesehen
        </button>
      </div>

      {/* List */}
      <CardList cards={filteredMovies} />

      {/* Pagination */}
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
