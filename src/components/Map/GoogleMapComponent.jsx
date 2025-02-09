import React, { useEffect, useRef, useState } from 'react';
import './GoogleMapComponent.css';

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      { "color": "#f0e5e1" }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#987B73" }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      { "color": "#a18e89" }
    ]
  }
];

function GoogleMapComponent() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);

  const cities = {
    Minneapolis: { lat: 44.9778, lng: -93.2650 },
    NewYork: { lat: 40.7128, lng: -74.0060 },
    SanFrancisco: { lat: 37.7749, lng: -122.4194 },
    Chicago: { lat: 41.8781, lng: -87.6298 },
    LosAngeles: { lat: 34.0522, lng: -118.2437 },
    Miami: { lat: 25.7617, lng: -80.1918 },
    Seattle: { lat: 47.6062, lng: -122.3321 }
  };

  // Dynamically load Google Maps API
  const loadGoogleMapsAPI = () => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject('Failed to load Google Maps API');
        document.head.appendChild(script);
      }
    });
  };

  useEffect(() => {
    loadGoogleMapsAPI()
      .then(() => {
        const googleMap = new window.google.maps.Map(mapRef.current, {
          center: cities.Minneapolis,
          zoom: 10,
          styles: mapStyle,
          mapTypeControl: false
        });
        setMap(googleMap);
      })
      .catch((err) => {
        console.error(err);
        setError('Google Maps API failed to load.');
      });
  }, []);

  const handleCityChange = (event) => {
    const selectedCity = cities[event.target.value];
    if (map && selectedCity) {
      map.setCenter(selectedCity);
      map.setZoom(10);
    }
  };

  return (
    <div className="google-map-container">
      <div className="map-dropdown">
        <select onChange={handleCityChange} defaultValue="Minneapolis">
          {Object.keys(cities).map((city) => (
            <option key={city} value={city}>
              {city.replace(/([A-Z])/g, ' $1').trim()}
            </option>
          ))}
        </select>
      </div>
      
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div ref={mapRef} className="map" />
      )}
    </div>
  );
}

export default GoogleMapComponent;