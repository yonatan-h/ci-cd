import "@testing-library/jest-dom";
import {
  parseCityData,
  parseCurrentWeather,
  parseDailyWeather,
  parseHourlyWeather,
} from "../src/api/APICalls";

describe("parse jsons", () => {
  it("should correctly parse and round the current weather data", async () => {
    const mockInput = {
      current: {
        temperature_2m: 21.6,
        wind_speed_10m: 5.9,
        weather_code: 45,
      },
      daily: {
        temperature_2m_max: [25.3],
        temperature_2m_min: [15.7],
        apparent_temperature_max: [27.8],
        apparent_temperature_min: [14.2],
        precipitation_sum: [1.237],
      },
    };

    const result = await parseCurrentWeather(mockInput);

    expect(result.currentTemp).toEqual(22);
  });

  it("should parse daily weather data correctly", async () => {
    const mockInput = {
      daily: {
        time: [1716585600, 1716672000],
        weather_code: [100, 200],
        temperature_2m_max: [25.5, 30.2],
      },
    };

    const expectedOutput = [
      {
        timestamp: 1716585600 * 1000,
        iconCode: 100,
        maxTemp: 26,
      },
      {
        timestamp: 1716672000 * 1000,
        iconCode: 200,
        maxTemp: 30,
      },
    ];

    expect(await parseDailyWeather(mockInput)).toEqual(expectedOutput);
  });

  it("should parse and filter hourly weather data correctly", async () => {
    const mockInput = {
      hourly: {
        time: [1716585600, 1716589200, 1716592800],
        weather_code: [100, 200, 300],
        temperature_2m: [20.3, 21.7, 19.5],
        apparent_temperature: [19.8, 21.2, 19.0],
        wind_speed_10m: [5.4, 6.1, 4.9],
        precipitation: [0.12, 0.08, 0.05],
      },
      current: {
        time: 1716589200,
      },
    };

    const expectedOutput = [
      {
        timestamp: 1716589200 * 1000,
        iconCode: 200,
        maxTemp: 22,
        feelsLike: 21,
        windSpeed: 6,
        precip: 0.08,
      },
      {
        timestamp: 1716592800 * 1000,
        iconCode: 300,
        maxTemp: 20,
        feelsLike: 19,
        windSpeed: 5,
        precip: 0.05,
      },
    ];

    const result = await parseHourlyWeather(mockInput);
    expect(result).toEqual(expectedOutput);
  });

  it("should return an empty array if no hourly timestamps match current", async () => {
    const mockInput = {
      hourly: {
        time: [1716585600, 1716589200],
        weather_code: [100, 200],
        temperature_2m: [20.3, 21.7],
        apparent_temperature: [19.8, 21.2],
        wind_speed_10m: [5.4, 6.1],
        precipitation: [0.12, 0.08],
      },
      current: {
        time: 1716599200,
      },
    };

    expect(await parseHourlyWeather(mockInput)).toEqual([]);
  });

  it("should parse city data correctly", async () => {
    const mockInput = {
      results: [
        { id: 1, name: "Paris", latitude: 48.8566, longitude: 2.3522 },
        { id: 2, name: "London", latitude: 51.5074, longitude: -0.1278 },
      ],
    };

    const expectedOutput = [
      { id: 1, name: "Paris", latitude: 48.8566, longitude: 2.3522 },
      { id: 2, name: "London", latitude: 51.5074, longitude: -0.1278 },
    ];

    expect(await parseCityData(mockInput)).toEqual(expectedOutput);
  });

  it("should return an empty array if results is undefined", async () => {
    const mockInput = {}; // no results field
    expect(await parseCityData(mockInput)).toEqual([]);
  });

  it("should return an empty array if results is null", async () => {
    const mockInput = { results: null };
    expect(await parseCityData(mockInput)).toEqual([]);
  });
});
