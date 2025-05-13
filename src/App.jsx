// path=Gruppenprojekt-SPA/src/App.jsx
import React from "react";
import "./App.css";

import CardList from "./components/CardList";

import ObjPage from "./pages/main/ObjPage";


function App() {
  return (
    <div className="app-container">

      <h1>Movie Cards</h1>
      <CardList />

      <ObjPage />

    </div>
  );
}

export default App;
