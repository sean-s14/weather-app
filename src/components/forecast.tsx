// TODOS:
// - What current temperature feels like
// - Sunrise and sunset times

import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchForecast } from "@/api/forecast";
import { getTemp } from "@/lib/temperature";
import { TemperatureUnit } from "@/types/temperature";
import { getDayOfWeek, getMonth, getDayOfMonth } from "@/lib/dates";

const temperateUnitOptions: TemperatureUnit[] = ["celsius", "fahrenheit"];

export default function Forecast({
  coordinates,
  temperatureUnit,
  setTemperatureUnit,
}: {
  coordinates: { lat: number; lon: number };
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
}) {
  const { data: forecastData, isLoading } = useQuery({
    queryKey: [
      "current-forecast" +
        "&lat=" +
        coordinates.lat +
        "&lon=" +
        coordinates.lon,
    ],
    queryFn: () => fetchForecast(coordinates),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const currentTime =
    forecastData &&
    new Date(
      forecastData?.dt * 1000 + forecastData?.timezone * 1000
    ).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const date = forecastData && new Date(forecastData?.dt * 1000).toString();
  const dayOfWeek = date && getDayOfWeek(date);
  const dayOfMonth = date && getDayOfMonth(date);
  const month = date && getMonth(date);

  return (
    <Card
      id="current-forecast"
      className="flex flex-col p-4 min-w-fit max-w-[90%]"
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Location */}
          <h1 className="text-xl sm:text-2xl" aria-label="location">
            Forecast for{" "}
            <span className="font-semibold">
              {forecastData?.name}, {forecastData?.sys?.country}
            </span>{" "}
            at <span className="font-semibold">{currentTime}</span>
          </h1>

          {/* Date */}
          <h2 aria-label="date" className="text-lg sm:text-xl mt-1">
            <span>{dayOfWeek}</span>, <span>{month}</span>{" "}
            <span>{dayOfMonth}</span>
          </h2>

          <div className="flex gap-1 xs:gap-4 items-center">
            {/* Icon */}
            <div className="w-28 h-28">
              <img
                className="w-full h-full"
                src={`https://openweathermap.org/img/wn/${forecastData?.weather[0]?.icon}@2x.png`}
                alt={forecastData?.weather[0]?.description}
              />
            </div>

            {/* Temperature */}
            <div>
              {/* Current Temperature */}
              <div
                aria-label="current temperature"
                className="text-3xl font-semibold"
              >
                {getTemp(forecastData?.main?.temp, temperatureUnit)?.toFixed(1)}
                <span>°C</span>
              </div>

              {/* Minimum and Maximum Temperatures */}
              <div className="flex gap-2">
                <span aria-label="minimum temperature">
                  {getTemp(
                    forecastData?.main?.temp_min,
                    temperatureUnit
                  )?.toFixed(0)}
                  °C
                </span>
                <span aria-label="maximum temperature">
                  {getTemp(
                    forecastData?.main?.temp_max,
                    temperatureUnit
                  )?.toFixed(0)}
                  °C
                </span>
              </div>
            </div>

            {/* Temperature Unit Toggle */}
            <div className="flex gap-2 text-3xl ml-4">
              {temperateUnitOptions.map((unit: TemperatureUnit) => (
                <button
                  key={unit}
                  aria-label={"change temperature unit to " + unit}
                  onClick={() => setTemperatureUnit(unit)}
                  className={`w-12 xs:w-14 h-12 xs:h-14 border-2 rounded-lg ${
                    temperatureUnit === unit
                      ? "font-semibold border-neutral-400 dark:border-neutral-600"
                      : "font-light"
                  }`}
                >
                  °{unit === "celsius" ? "C" : "F"}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <p
            aria-label="weather description"
            className="text-2xl sm:text-3xl mb-1"
          >
            {/* Capitalise first letter */}
            {forecastData?.weather[0]?.description &&
              forecastData?.weather[0]?.description?.charAt(0).toUpperCase() +
                forecastData?.weather[0]?.description?.slice(1)}
            {/* {forecastData?.weather[0]?.description} */}
          </p>

          {/* Coordinates, Pressure, Wind Speed, etc. */}
          <div className="flex flex-wrap gap-1 xs:gap-8 text-normal sm:text-lg text-neutral-400 dark:text-neutral-400">
            <ul className="*:max-w-64 *:flex *:gap-4">
              <li className="w-full border my-2"></li>
              {/* Wind Speed */}
              <li aria-label="wind speed">
                <span className="w-full" aria-hidden="true">
                  Wind Speed:
                </span>
                <span className="text-end" aria-hidden="true">
                  {forecastData?.wind?.speed}m/s
                </span>
              </li>

              {/* Humidity */}
              <li aria-label="humidity">
                <span className="w-full" aria-hidden="true">
                  Humidity:
                </span>
                <span className="text-end w-full" aria-hidden="true">
                  {forecastData?.main?.humidity}%
                </span>
              </li>

              {/* Pressure */}
              <li aria-label="pressure">
                <span className="w-full" aria-hidden="true">
                  Pressure:
                </span>
                <span className="text-end w-full" aria-hidden="true">
                  {forecastData?.main?.pressure} hPa
                </span>
              </li>
            </ul>
            <ul className="*:max-w-72 *:flex *:gap-2">
              <li className="w-full border my-2"></li>
              {/* Latitude */}
              <li aria-label="latitude">
                <span className="w-full" aria-hidden="true">
                  Latitude:
                </span>
                <span className="text-end w-full" aria-hidden="true">
                  {coordinates.lat}
                </span>
              </li>

              {/* Longitude */}
              <li aria-label="longitude">
                <span className="w-full" aria-hidden="true">
                  Longitude:
                </span>
                <span className="text-end w-full" aria-hidden="true">
                  {coordinates.lon}
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
}
