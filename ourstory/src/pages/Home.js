import GoogleMapView from "../components/GoogleMapView";

function Home() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-center">Minneapolis Interactive Map</h1>
      <GoogleMapView />
    </div>
  );
}

export default Home;
