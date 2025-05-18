import "@testing-library/jest-dom";
import { parseCurrentWeather } from "../src/api/APICalls";

describe("parseCurrentWeather", () => {
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
});
