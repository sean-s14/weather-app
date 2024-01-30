import { TfiveDayForecast } from "@/types/fiveDayForecast";

export const fetchFiveDayForecast = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  if (!lat || !lon) throw new Error("No latitude or longitude provided");
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`
  );
  const data: TfiveDayForecast = await response.json();
  if (import.meta.env.DEV) console.log("Five Day Forecast Data:", data);
  return data;
};
