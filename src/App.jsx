import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Movies from "./pages/movies";
import Series from "./pages/series";
import Watchlist from "./pages/watchlist";
import Movie from "./pages/movie";
import Serie from "./pages/serie";
import ObjPage from "./pages/ObjPage";
import "./index.css";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero is only visible on the homepage */}
      {isHome && <Hero />}

      {/* Routes: only render if NOT home */}
      {!isHome && (
        <div className="app-container">
          <Routes>
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<Movie />} />
            <Route path="/series" element={<Series />} />
            <Route path="/series/:id" element={<Serie />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/testobj" element={<ObjPage />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
