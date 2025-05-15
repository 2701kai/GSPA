import { useEffect, useState } from "react";
import { getPopSeries } from "../services/api";
import CardList from "../components/CardList";
import { getAllSeriesIds } from "../services/localstorage";

export default function Series() {
  const [series, setSeries] = useState([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [tab, setTab] = useState("all");
  const [watchedIds, setWatchedIds] = useState([]);

  useEffect(() => {
    async function fetchSeries() {
      try {
        const data = await getPopSeries(1);
        setSeries(data);
        setWatchedIds(getAllSeriesIds());
      } catch (error) {
        console.error("Fehler beim Laden der Serien", error);
      }
    }
    fetchSeries();
  }, []);

  const filteredSeries = series
    .filter((s) => s.title.toLowerCase().includes(query.toLowerCase()))
    .filter((s) => {
      if (tab === "watched") return watchedIds.includes(s.id);
      if (tab === "unwatched") return !watchedIds.includes(s.id);
      return true;
    })
    .sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📺 Serien</h2>

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

      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6">
        <input
          type="text"
          placeholder="Nach Serie suchen..."
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

      <CardList cards={filteredSeries} type="series" />
    </div>
  );
}
