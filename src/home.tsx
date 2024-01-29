import { useState, useEffect } from "react";
import Searchbar from "@/components/searchbar";

export default function Home() {
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    console.log(coordinates);

    // If user has already set a location, don't get their location
    if (coordinates.lat !== 0 && coordinates.lon !== 0) return;

    // Get user's location
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, [coordinates]);

  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <Searchbar setCoordinates={setCoordinates} />
      <ul className="w-full mt-10">
        <li aria-label={"Latitude " + coordinates.lat}>
          <span aria-hidden="true">Latitude:</span>
          <span id="latitude-test" aria-hidden="true">
            {coordinates.lat}
          </span>
        </li>
        <li aria-label={"Longitude " + coordinates.lon}>
          <span aria-hidden="true">Longitude:</span>
          <span id="longitude-test" aria-hidden="true">
            {coordinates.lon}
          </span>
        </li>
      </ul>
    </div>
  );
}
