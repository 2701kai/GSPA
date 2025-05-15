import { useEffect, useState } from "react";
import { getPopSeries } from "../services/api";
import CardList from "../components/CardList";

export default function Series() {
  const [series, setSeries] = useState([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    async function fetchSeries() {
      try {
        const data = await getPopSeries(1);
        setSeries(data);
      } catch (error) {
        console.error("Fehler beim Laden der Serien", error);
      }
    }
    fetchSeries();
  }, []);

  const filteredSeries = series
    .filter((s) => s.title.toLowerCase().includes(query.toLowerCase()))
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
