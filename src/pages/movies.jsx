import { useEffect, useState } from "react";
import { getMovies } from "../services/api";
import CardList from "../components/CardList";
import { getAllMovieIds } from "../services/localstorage";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedTab, setSelectedTab] = useState("All");
  const [watchedIds, setWatchedIds] = useState([]);

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

    // IDs der gesehenen Filme aus localStorage laden
    setWatchedIds(getAllMovieIds());
  }, []);

  // فیلتر کردن براساس تب انتخابی
  const filteredByTab = movies.filter((movie) => {
    if (selectedTab === "All") return true;
    if (selectedTab === "Watched") return watchedIds.includes(movie.id);
    if (selectedTab === "Unwatched") return !watchedIds.includes(movie.id);
    return true;
  });

  // فیلتر بر اساس جستجو و سپس مرتب‌سازی
  const filteredMovies = filteredByTab
    .filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      } else {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      }
    });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🎬 Filme</h2>

      {/* تب‌ها */}
      <div className="mb-6 flex gap-4">
        {["All", "Watched", "Unwatched"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded ${
              selectedTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* نوار جستجو و مرتب‌سازی */}
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

      {/* نمایش لیست کارت‌ها */}
      <CardList cards={filteredMovies} type="movies" />
    </div>
  );
}
