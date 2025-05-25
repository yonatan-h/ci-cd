"use server";

import axios from "axios";

export type CurrentWeatherType = {
  currentTemp: number;
  highTemp: number;
  lowTemp: number;
  highFeelsLike: number;
  lowFeelsLike: number;
  windSpeed: number;
  precip: number;
  iconCode: number;
};

export type DailytWeatherType = {
  timestamp: number;
  iconCode: number;
  maxTemp: number;
};

export type HourlyWeatherType = {
  timestamp: number;
  iconCode: number;
  maxTemp: number;
  feelsLike: number;
  windSpeed: number;
  precip: number;
};

export type CitySearchType = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export async function getWeather(
  lat: number,
  lon: number,
  timezone: string
): Promise<{
  current: CurrentWeatherType;
  daily: DailytWeatherType[];
  hourly: HourlyWeatherType[];
}> {
  "use server";

  return await axios
    .get(
      "https://api.open-meteo.com/v1/forecast?current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&precipitation_unit=inch&timeformat=unixtime",
      {
        params: {
          latitude: lat,
          longitude: lon,
          timezone,
        },
      }
    )
    .then(async (response) => {
      //OR then(({data}))
      return {
        current: await parseCurrentWeather(response.data),
        daily: await parseDailyWeather(response.data),
        hourly: await parseHourlyWeather(response.data),
      };
    });
}

export async function parseCurrentWeather({
  current,
  daily,
}: any): Promise<CurrentWeatherType> {
  const {
    temperature_2m: currentTemp,
    wind_speed_10m: windSpeed,
    weather_code: iconCode,
  } = current;
  const {
    temperature_2m_max: [maxTemp],
    temperature_2m_min: [minTemp],
    apparent_temperature_max: [maxFeelsLike],
    apparent_temperature_min: [minFeelsLike],
    precipitation_sum: [precip],
  } = daily;

  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(maxTemp),
    lowTemp: Math.round(minTemp),
    highFeelsLike: Math.round(maxFeelsLike),
    lowFeelsLike: Math.round(minFeelsLike),
    windSpeed: Math.round(windSpeed),
    precip: Math.round(precip * 100) / 100,
    iconCode: iconCode,
  };
}

export async function parseDailyWeather({
  daily,
}: any): Promise<DailytWeatherType[]> {
  return daily.time.map((time: number, index: number) => {
    return {
      timestamp: time * 1000, //second to milliseconds
      iconCode: daily.weather_code[index],
      maxTemp: Math.round(daily.temperature_2m_max[index]),
    };
  });
}

export async function parseHourlyWeather({
  hourly,
  current,
}: any): Promise<HourlyWeatherType[]> {
  console.log(current.time * 1000);
  return hourly.time
    .map((time: number, index: number) => {
      return {
        timestamp: time * 1000,
        iconCode: hourly.weather_code[index],
        maxTemp: Math.round(hourly.temperature_2m[index]),
        feelsLike: Math.round(hourly.apparent_temperature[index]),
        windSpeed: Math.round(hourly.wind_speed_10m[index]),
        precip: Math.round(hourly.precipitation[index] * 100) / 100,
      };
    })
    .filter(({ timestamp }: any) => timestamp >= current.time * 1000);
}

export async function getCities(cityName: string): Promise<CitySearchType[]> {
  "use server";

  return await axios
    .get(
      "https://geocoding-api.open-meteo.com/v1/search?count=3&language=en&format=json",
      {
        params: {
          name: cityName,
        },
      }
    )
    .then((response) => {
      return parseCityData(response.data);
    });
}

export async function parseCityData(data: any): Promise<CitySearchType[]> {
  return (
    data.results?.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        latitude: item.latitude,
        longitude: item.longitude,
      };
    }) ?? []
  );
}
