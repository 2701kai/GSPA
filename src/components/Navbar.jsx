import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-cinesphere.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-base-200 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="CineSphere logo" className="h-8 w-8" />
          <span
            className="hidden sm:inline text-xl font-bold text-primary hover:tooltip hover:tooltip-bottom"
            data-tip="CineSphere"
          >
            CP
          </span>
        </Link>

        <button
          className="md:hidden btn btn-sm"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <ul
          className={`md:flex space-x-2 ${
            menuOpen
              ? "block absolute top-16 right-4 bg-base-100 shadow-md rounded-xl p-4 z-50"
              : "hidden"
          } md:static md:bg-transparent md:shadow-none md:rounded-none md:p-0 md:z-auto`}
        >
          <li>
            <Link to="/movies" className="btn btn-sm btn-ghost">
              Movies
            </Link>
          </li>
          <li>
            <Link to="/series" className="btn btn-sm btn-ghost">
              Series
            </Link>
          </li>
          <li>
            <Link to="/watchlist" className="btn btn-sm btn-ghost">
              Watchlist
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
