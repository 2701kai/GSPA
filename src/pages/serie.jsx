import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSeriesById } from "../services/api";

export default function Serie() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);

  useEffect(() => {
    async function fetchSerie() {
      try {
        const data = await getSeriesById(Number(id));
        setSerie(data);
      } catch (error) {
        setSerie(null);
      }
    }
    fetchSerie();
  }, [id]);

  if (!serie) return <div>Serie nicht gefunden...</div>;

  return (
    <div>
      <h2>{serie.title}</h2>
      <p>{serie.overview}</p>
      <p>Jahr: {serie.year}</p>
      <p>Genres: {serie.genres && serie.genres.join(", ")}</p>
      {serie.img && (
        <img src={serie.img} alt={serie.title} style={{ maxWidth: 300 }} />
      )}
      {serie.img_backdrop && (
        <img
          src={serie.img_backdrop}
          alt={serie.title + " backdrop"}
          style={{ maxWidth: 300 }}
        />
      )}
    </div>
  );
}
