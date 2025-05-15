import { useEffect, useState } from "react";
import { getPopSeries } from "../services/api";
import CardList from "../components/CardList";

export default function Series() {
  const [series, setSeries] = useState([]);

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

  return (
    <div>
      <h2 className="text-2xl font-bold my-4 text-center text-purple-800">
        📺 Serien
      </h2>

      <CardList cards={series} type="series" />
    </div>
  );
}
