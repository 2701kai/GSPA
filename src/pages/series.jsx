import { useEffect, useState } from "react";
import { getPopSeries } from "../services/api";
import { Link } from "react-router-dom";

export default function Series() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    async function fetchSeries() {
      try {
        const data = await getPopSeries(1);
        setSeries(data);
      } catch (error) {
        console.error("Fehler beim Laden der Serien:", error);
      }
    }
    fetchSeries();
  }, []);

  return (
    <div>
      <h2>Serien</h2>
      <ul>
        {series.map((serie) => (
          <li key={serie.id}>
            <Link to={`/series/${serie.id}`}>
              {serie.title}
              {serie.img && (
                <img
                  src={serie.img}
                  alt={serie.title}
                  style={{ maxWidth: 300 }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
