import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

// Replace with your Google Maps API Key
const GOOGLE_MAPS_API_KEY = "AIzaSyDzrs1M627xrP05phKCTVEmgltJG2jkMe0";

// Center the map on Minneapolis
const center = { lat: 44.9778, lng: -93.2650 };

// Sample historical sites & events
const locations = [
  {
    id: 1,
    title: "Stone Arch Bridge",
    description: "Historic bridge built in 1883, now a pedestrian trail.",
    position: { lat: 44.9809, lng: -93.2533 },
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Stone_Arch_Bridge.jpg/320px-Stone_Arch_Bridge.jpg",
  },
  {
    id: 2,
    title: "Minneapolis City Hall",
    description: "Iconic government building with a distinctive clock tower.",
    position: { lat: 44.9778, lng: -93.2650 },
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Minneapolis_City_Hall.jpg/320px-Minneapolis_City_Hall.jpg",
  },
];

function GoogleMapView() {
  const [selected, setSelected] = useState(null);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "500px" }}
        center={center}
        zoom={12} // Adjust zoom level to fit Minneapolis
        options={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        {/* Markers for locations */}
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={loc.position}
            onClick={() => setSelected(loc)}
          />
        ))}

        {/* Popups for markers */}
        {selected && (
          <InfoWindow
            position={selected.position}
            onCloseClick={() => setSelected(null)}
          >
            <div style={{ maxWidth: "200px" }}>
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
              <img src={selected.image} alt={selected.title} style={{ width: "100%", borderRadius: "5px" }} />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapView;
