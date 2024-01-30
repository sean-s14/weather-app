import { list } from "@/types/fiveDayForecast";
import { getDayOfWeek } from "./dates";

// Celsius to Kelvin
export function celsiusToKelvin(celsius: number): number {
  return celsius + 273.15;
}

// Kelvin to Celsius
export function kelvinToCelsius(kelvin: number): number {
  return kelvin - 273.15;
}

// Celsius to Fahrenheit
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

// Fahrenheit to Celsius
export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

// Kelvin to Fahrenheit
export function kelvinToFahrenheit(kelvin: number): number {
  return ((kelvin - 273.15) * 9) / 5 + 32;
}

// Fahrenheit to Kelvin
export function fahrenheitToKelvin(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9 + 273.15;
}

export interface DailyAverage extends list {
  min_temp?: number;
  max_temp?: number;
}

/**
 * Takes a list of weather objects and returns a list of weather objects, one for each day, with the max temp and min temp for that day.
 * @param weatherList
 * @returns {DailyAverage[]}
 */
export function getDailyAverage(weatherList: list[]): DailyAverage[] {
  const groupedByDay: Record<string, DailyAverage> = {};

  weatherList.forEach((weather) => {
    const dayOfWeek = getDayOfWeek(weather.dt_txt);
    if (!groupedByDay[dayOfWeek]) {
      groupedByDay[dayOfWeek] = weather;
    }
    if (weather.main.temp_max > groupedByDay[dayOfWeek].main.temp_max) {
      groupedByDay[dayOfWeek] = weather;
    }
  });

  // Go through weatherlist again and find the day with the lowest min_temp and add the min_temp to the object
  weatherList.forEach((weather) => {
    const dayOfWeek = getDayOfWeek(weather.dt_txt);
    if (!groupedByDay[dayOfWeek]?.min_temp) {
      groupedByDay[dayOfWeek].min_temp = weather.main.temp_min;
    } else if (weather.main.temp_min < groupedByDay[dayOfWeek].min_temp!) {
      groupedByDay[dayOfWeek].min_temp = weather.main.temp_min;
    }
  });

  // Do the same for max_temp
  weatherList.forEach((weather) => {
    const dayOfWeek = getDayOfWeek(weather.dt_txt);
    if (!groupedByDay[dayOfWeek]?.max_temp) {
      groupedByDay[dayOfWeek].max_temp = weather.main.temp_max;
    } else if (weather.main.temp_max > groupedByDay[dayOfWeek].max_temp!) {
      groupedByDay[dayOfWeek].max_temp = weather.main.temp_max;
    }
  });

  // Convert groupedByDay to an array
  const result = Object.values(groupedByDay);
  return result;
}
