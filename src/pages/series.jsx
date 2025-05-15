import { useEffect, useState } from "react";
import { getPopSeries } from "../services/api";
import CardList from "../components/CardList";

export default function Series() {
  const [series, setSeries] = useState([]);
  const [query, setQuery] = useState("");

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

  const filteredSeries = series.filter((serie) =>
    serie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📺 Serien</h2>

      <input
        type="text"
        placeholder="Nach Serie suchen..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full md:w-1/3 px-4 py-2 mb-6 border rounded-md shadow-sm"
      />

      <CardList cards={filteredSeries} type="series" />
    </div>
  );
}
