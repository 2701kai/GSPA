// path=Gruppenprojekt-SPA/src/App.jsx
import React from "react";
import "./App.css";
import CardList from "./components/CardList";

function App() {
  return (
    <div className="app-container">
      <h1>Movie Cards</h1>
      <CardList />
    </div>
  );
}

export default App;
