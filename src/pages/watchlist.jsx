import { useEffect, useState } from "react";
import { getAllMovies, getAllSeries } from "../services/localstorage";

function Watchlist() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    setMovies(getAllMovies());
    setSeries(getAllSeries());
  }, []);

  return (
    <div>
      <h2>Watchlist</h2>
      <h3>Filme</h3>
      <ul>
        {movies.length === 0 && <li>Keine Filme in der Watchlist.</li>}
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      <h3>Serien</h3>
      <ul>
        {series.length === 0 && <li>Keine Serien in der Watchlist.</li>}
        {series.map((serie) => (
          <li key={serie.id}>{serie.title || serie.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Watchlist;
