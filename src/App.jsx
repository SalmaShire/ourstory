import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LeftFeed from './components/LeftFeed/LeftFeed';
import NavBar from './components/NavBar/NavBar';
import GoogleMapComponent from './components/Map/GoogleMapComponent';
import Community from './pages/community/Community';
import './App.css';

function AppContent() {
  const location = useLocation(); 

  return (
    <div className="app-layout">
      {/* only show LeftFeed if NOT on Community page */}
      {location.pathname !== "/community" && <LeftFeed />}  

      <div className="right-section">
        <NavBar />
        <div className="map-container">
          <Routes>
            <Route path="/" element={<GoogleMapComponent />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
