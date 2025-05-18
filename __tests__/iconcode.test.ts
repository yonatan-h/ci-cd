import { FaBolt, FaCloudRain, FaCloudSun, FaSun } from "react-icons/fa";
import { getIcon } from "../src/util/IconCode";

test("getIcon returns correct icon component for known codes and default for unknown", () => {
  expect(getIcon(0)).toBe(FaSun);
  expect(getIcon(1)).toBe(FaSun);
  expect(getIcon(2)).toBe(FaCloudSun);
  expect(getIcon(53)).toBe(FaCloudRain);
  expect(getIcon(95)).toBe(FaBolt);
  expect(getIcon(999)).toBe(FaSun);
});
