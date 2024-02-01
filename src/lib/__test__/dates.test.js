import { test, expect } from "vitest";
import { getDayOfWeek, getDayOfMonth, getMonth } from "../dates";

test("getDayOfWeek returns the correct day of the week", () => {
  const date = new Date("2024-01-01");
  expect(getDayOfWeek(date)).toBe("Monday");
});

test("getDayOfMonth returns the correct day of the month", () => {
  const date = new Date("2024-01-01");
  expect(getDayOfMonth(date)).toBe(1);
});

test("getMonth returns the correct month", () => {
  const date = new Date("2024-01-01");
  expect(getMonth(date)).toBe("January");
});
