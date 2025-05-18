import {
  formatTimestampToDay,
  formatTimestampToNumericHour,
} from "../src/util/Date";

test("zero timestamp returns empty strings", () => {
  expect(formatTimestampToDay(0)).toBe("");
  expect(formatTimestampToNumericHour(0)).toBe("");
});
