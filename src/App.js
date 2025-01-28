import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MapComponent from "./components/map/map";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Nico Antenas</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="map-container">
        <MapComponent/>
      </div>
    </div>
  );
};

export default App;
