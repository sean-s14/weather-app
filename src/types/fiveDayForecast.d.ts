type main = {
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

type weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type clouds = {
  all: number;
};

type wind = {
  speed: number;
  deg: number;
  gust: number;
};

type sys = {
  pod: string;
};

type list = {
  dt: number;
  main: main;
  weather: weather[];
  clouds: clouds;
  wind: wind;
  visibility: number;
  pop: number;
  sys: sys;
  dt_txt: string;
};

type coord = {
  lat: number;
  lon: number;
};

type city = {
  id: number;
  name: string;
  coord: coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type TfiveDayForecast = {
  cod: string;
  message: number;
  cnt: number;
  list: list[];
  city: city;
};

export type { TfiveDayForecast, list };
