import { TLocationName } from "@/types/geocode";

export const fetchLocation = async (location: string) => {
  if (!location) return Promise.resolve([] as TLocationName[]);
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${
      import.meta.env.VITE_OPEN_WEATHER_API_KEY
    }`
  );
  const data: TLocationName[] = await response.json();
  if (import.meta.env.DEV) console.log("Data:", data);
  return data;
};
