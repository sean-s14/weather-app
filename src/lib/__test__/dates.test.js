import { test, expect } from "vitest";
import { getDayOfWeek } from "../dates";

test("getDayOfWeek returns the correct day of the week", () => {
  const date = new Date("2024-01-01");
  expect(getDayOfWeek(date)).toBe("Monday");
});
