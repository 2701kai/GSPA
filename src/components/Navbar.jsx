import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/movies">Movies</Link>
      <Link to="/series">Series</Link>
      <Link to="/watchlist">Watchlist</Link>
    </nav>
  );
}

export default Navbar;
