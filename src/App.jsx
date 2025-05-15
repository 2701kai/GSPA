import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Movies from "./pages/movies";
import Series from "./pages/series";
import Watchlist from "./pages/watchlist";
import Movie from "./pages/movie";
import Serie from "./pages/serie";
import ObjPage from "./pages/ObjPage";
import "./index.css"; // ensure tailwind is applied globally

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <Router>
      <Navbar />
      <Hero />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/series/:id" element={<Serie />} />
          <Route path="/series" element={<Series />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/testobj" element={<ObjPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
