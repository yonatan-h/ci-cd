import {
  FaBolt,
  FaCloud,
  FaCloudMoonRain,
  FaCloudRain,
  FaCloudShowersHeavy,
  FaCloudSun,
  FaCloudSunRain,
  FaSmog,
  FaSnowflake,
  FaSnowman,
  FaSun,
} from "react-icons/fa";
import { getIcon } from "../src/util/IconCode";

describe("getIcon", () => {
  it("returns FaSun for code 0 and 1", () => {
    expect(getIcon(0)).toBe(FaSun);
    expect(getIcon(1)).toBe(FaSun);
  });

  it("returns FaCloudSun for code 2", () => {
    expect(getIcon(2)).toBe(FaCloudSun);
  });

  it("returns FaCloud for code 3", () => {
    expect(getIcon(3)).toBe(FaCloud);
  });

  it("returns FaSmog for code 45 and 48", () => {
    expect(getIcon(45)).toBe(FaSmog);
    expect(getIcon(48)).toBe(FaSmog);
  });

  it("returns FaCloudRain for code 51, 53, 55", () => {
    expect(getIcon(51)).toBe(FaCloudRain);
    expect(getIcon(53)).toBe(FaCloudRain);
    expect(getIcon(55)).toBe(FaCloudRain);
  });

  it("returns FaCloudMoonRain for code 56, 57", () => {
    expect(getIcon(56)).toBe(FaCloudMoonRain);
    expect(getIcon(57)).toBe(FaCloudMoonRain);
  });

  it("returns FaCloudSunRain for code 61, 63, 65", () => {
    expect(getIcon(61)).toBe(FaCloudSunRain);
    expect(getIcon(63)).toBe(FaCloudSunRain);
    expect(getIcon(65)).toBe(FaCloudSunRain);
  });

  it("returns FaCloudShowersHeavy for code 66, 67, 80, 81, 82", () => {
    expect(getIcon(66)).toBe(FaCloudShowersHeavy);
    expect(getIcon(67)).toBe(FaCloudShowersHeavy);
    expect(getIcon(80)).toBe(FaCloudShowersHeavy);
    expect(getIcon(81)).toBe(FaCloudShowersHeavy);
    expect(getIcon(82)).toBe(FaCloudShowersHeavy);
  });

  it("returns FaSnowflake for code 71, 73, 75, 85, 86", () => {
    expect(getIcon(71)).toBe(FaSnowflake);
    expect(getIcon(73)).toBe(FaSnowflake);
    expect(getIcon(75)).toBe(FaSnowflake);
    expect(getIcon(85)).toBe(FaSnowflake);
    expect(getIcon(86)).toBe(FaSnowflake);
  });

  it("returns FaSnowman for code 77", () => {
    expect(getIcon(77)).toBe(FaSnowman);
  });

  it("returns FaBolt for code 95", () => {
    expect(getIcon(95)).toBe(FaBolt);
  });

  it("returns FaCloud for code 96, 99", () => {
    expect(getIcon(96)).toBe(FaCloud);
    expect(getIcon(99)).toBe(FaCloud);
  });

  it("returns FaSun for unknown codes (default case)", () => {
    expect(getIcon(123)).toBe(FaSun);
    expect(getIcon(-1)).toBe(FaSun);
  });
});
