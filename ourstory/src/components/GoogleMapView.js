import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";

// Replace with your Google Maps API Key
const GOOGLE_MAPS_API_KEY = "AIzaSyDzrs1M627xrP05phKCTVEmgltJG2jkMe0";

// Map center on Minneapolis
const center = { lat: 44.9778, lng: -93.2650 };

// Sample locations with markers
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

  // Load Google Maps API efficiently
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "500px" }}
      center={center}
      zoom={12}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={loc.position}
          onClick={() => setSelected(loc)}
        />
      ))}

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
  );
}

export default GoogleMapView;
