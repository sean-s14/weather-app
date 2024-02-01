import { useState, useEffect } from "react";
import Searchbar from "@/components/searchbar";
import FiveDayForecast from "@/components/five-day-forecast";
import Forecast from "@/components/forecast";
import { TemperatureUnit } from "@/types/temperature";

export default function Home() {
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [temperatureUnit, setTemperatureUnit] =
    useState<TemperatureUnit>("celsius");

  useEffect(() => {
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
      {/* Searchbar */}
      <Searchbar setCoordinates={setCoordinates} />

      {/* Current Forecast */}
      <div className="mt-4 flex justify-center">
        <Forecast
          coordinates={coordinates}
          temperatureUnit={temperatureUnit}
          setTemperatureUnit={setTemperatureUnit}
        />
      </div>

      {/* Five Day Forecast */}
      <div className="mt-4 self-center">
        <FiveDayForecast
          coordinates={coordinates}
          temperatureUnit={temperatureUnit}
        />
      </div>
    </div>
  );
}
