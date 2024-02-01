interface Coord {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  sea_level: number;
  grnd_level: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Clouds {
  all: number;
}

interface Rain {
  "1h"?: number;
  "3h"?: number;
}

interface Snow {
  "1h"?: number;
  "3h"?: number;
}

interface Sys {
  type: number;
  id: number;
  message?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Forecast {
  coord: Coord;
  weather: Weather[];
  main: Main;
  visibility?: number;
  wind: Wind;
  clouds: Clouds;
  rain?: Rain;
  snow?: Snow;
  dt: number;
  sys: Sys;
  timezone: number;
  id?: number;
  name?: string;
  cod?: number;
}

export type { Forecast };
