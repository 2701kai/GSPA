import { useEffect, useState } from "react";
import { getPopSeries } from "../services/api";
import Card from "../components/Card"; // Import the Card component
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
      <div className="card-list">
        {series.map((serie) => (
          <>
            <Card
              key={serie.id}
              image={serie.img} // Assuming serie.img contains the image URL
              title={serie.title}
              overview={serie.overview}
              year={serie.year}
              genres={serie.genres}
            />
            <Link to={`/series/${serie.id}`}>Page to {serie.title}</Link>
          </>
        ))}
      </div>
    </div>
  );
}
