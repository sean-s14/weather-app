import { test, expect } from "vitest";
import {
  celsiusToKelvin,
  celsiusToFahrenheit,
  kelvinToCelsius,
  kelvinToFahrenheit,
  fahrenheitToCelsius,
  fahrenheitToKelvin,
  getDailyAverage,
  getTemp,
} from "../temperature";
import fiveDayForecast from "./fixtures/fiveDayForecast.json";

test("celsiusToKelvin converts correctly", () => {
  expect(celsiusToKelvin(0)).toBe(273.15);
});

test("celsiusToFahrenheit converts correctly", () => {
  expect(celsiusToFahrenheit(0)).toBe(32);
});

test("kelvinToCelsius converts correctly", () => {
  expect(kelvinToCelsius(0)).toBe(-273.15);
});

test("kelvinToFahrenheit converts correctly", () => {
  expect(kelvinToFahrenheit(1)).toBe(-457.87);
});

test("fahrenheitToCelsius converts correctly", () => {
  expect(fahrenheitToCelsius(50)).toBe(10);
});

test("fahrenheitToKelvin converts correctly", () => {
  expect(fahrenheitToKelvin(0).toFixed(4)).toBe("255.3722");
});

test("getDailyAverage returns the correct average", () => {
  const dailyAverage = getDailyAverage(fiveDayForecast.list);
  expect(dailyAverage[0].min_temp).toBe(276.87);
  expect(dailyAverage[0].max_temp).toBe(283.77);
  expect(dailyAverage[0].dt_txt).toBe("2024-01-31 21:00:00");

  expect(dailyAverage[1].min_temp).toBe(276.95);
  expect(dailyAverage[1].max_temp).toBe(282.77);
  expect(dailyAverage[1].dt_txt).toBe("2024-02-01 00:00:00");

  expect(dailyAverage[2].min_temp).toBe(276.89);
  expect(dailyAverage[2].max_temp).toBe(285.53);
  expect(dailyAverage[2].dt_txt).toBe("2024-02-02 15:00:00");

  expect(dailyAverage[3].min_temp).toBe(283.38);
  expect(dailyAverage[3].max_temp).toBe(285.72);
  expect(dailyAverage[3].dt_txt).toBe("2024-02-03 15:00:00");

  expect(dailyAverage[4].min_temp).toBe(282.36);
  expect(dailyAverage[4].max_temp).toBe(285.37);
  expect(dailyAverage[4].dt_txt).toBe("2024-02-04 15:00:00");

  expect(dailyAverage[5].min_temp).toBe(283.09);
  expect(dailyAverage[5].max_temp).toBe(283.16);
  expect(dailyAverage[5].dt_txt).toBe("2024-02-05 00:00:00");
});

test("getTemp returns the correct temperature from kelvin to specified unit", () => {
  expect(getTemp(0, "celsius")).toBe(-273.15);
  expect(getTemp(1, "fahrenheit")).toBe(-457.87);
});
