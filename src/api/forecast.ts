import { Forecast } from "@/types/forecast";

export const fetchForecast = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  if (!lat || !lon) throw new Error("No latitude or longitude provided");
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`
  );
  const data: Forecast = await response.json();
  if (import.meta.env.DEV) console.log("Forecast Data:", data);
  return data;
};
