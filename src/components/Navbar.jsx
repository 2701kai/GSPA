import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-base-200 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">GSPA</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/movies" className="btn btn-ghost bg-orange-900 text-lg">
              Movies
            </Link>
          </li>
          <li>
            <Link to="/series" className="btn btn-ghost bg-orange-900 text-lg">
              Series
            </Link>
          </li>
          <li>
            <Link
              to="/watchlist"
              className="btn btn-ghost bg-orange-900 text-lg"
            >
              Watchlist
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
