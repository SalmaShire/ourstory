import React from 'react';
import LeftFeed from './components/LeftFeed/LeftFeed';
import NavBar from './components/NavBar/NavBar';
import GoogleMapComponent from './components/Map/GoogleMapComponent';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <LeftFeed />
      <div className="right-section">
        <NavBar />
        <div className="map-container">
          <GoogleMapComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
