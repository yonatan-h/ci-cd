"use client";

import {
  CitySearchType,
  CurrentWeatherType,
  DailytWeatherType,
  HourlyWeatherType,
  getWeather,
} from "@/api/APICalls";
import Search from "@/components/search/Search";
import { useCallback, useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import DayCard from "../components/card/DayCard";
import Header from "../components/header/Header";
import TableRow from "../components/table/TableRow";
const HOURLY_DATA_DISPLAY_LIMIT: number = 10;

export default function Home() {
  const [currentData, setCurrentData] = useState<CurrentWeatherType>();
  const [dailyData, setDailyData] = useState<DailytWeatherType[]>([]);
  const [hourlyData, setHourlyData] = useState<HourlyWeatherType[]>([]);
  const [selectedResult, setSelectedResult] = useState<CitySearchType>(
    {} as CitySearchType
  );
  const [currentHourlyDispayIndex, setCurrentHourlyDispayIndex] =
    useState<number>(0);
  const [hourlyDisplayData, setHourlyDisplayData] = useState<
    HourlyWeatherType[]
  >([]);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 10, longitude: 10 });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          alert(
            "There was an error getting your location. Please allow to use your location and refresh the page."
          );
        }
      );
    }
  }, []);

  const limitHourlyData = useCallback(
    (data: HourlyWeatherType[]) => {
      const newData = data.slice(
        0,
        HOURLY_DATA_DISPLAY_LIMIT + currentHourlyDispayIndex
      );
      setHourlyDisplayData(newData);
    },
    [currentHourlyDispayIndex]
  );

  useEffect(() => {
    const getData = async () => {
      const latitude =
        Object.keys(selectedResult).length > 0
          ? selectedResult.latitude
          : location.latitude;
      const longitude =
        Object.keys(selectedResult).length > 0
          ? selectedResult.longitude
          : location.longitude;

      const weatherData = await getWeather(
        latitude,
        longitude,
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );

      if (weatherData.current) {
        setCurrentData(weatherData.current);
      }

      if (weatherData.daily) {
        setDailyData(weatherData.daily);
      }

      if (weatherData.hourly) {
        limitHourlyData(weatherData.hourly);
        setHourlyData(weatherData.hourly);
      }
    };

    getData();
  }, [location, limitHourlyData, selectedResult]);

  function onClickResultHandler(item: CitySearchType): void {
    setSelectedResult(item);
  }

  return (
    <main className={`${currentData == null ? "blur-md" : ""} `}>
      {Object.keys(selectedResult).length > 0 && (
        <div className="flex justify-center items-center mt-6">
          <FaMapMarkerAlt className="w-6 h-6 object-contain" />
          <div className="text-center pl-2 text-foregroundColor text-2xl font-medium ">
            {selectedResult.name}
          </div>
        </div>
      )}
      <Search
        latitude={location.latitude}
        longitude={location.longitude}
        onClickResultHandler={onClickResultHandler}
      />
      <Header
        currentTemp={currentData?.currentTemp}
        highTemp={currentData?.highTemp}
        lowTemp={currentData?.lowTemp}
        highFeelsLike={currentData?.highFeelsLike}
        lowFeelsLike={currentData?.lowFeelsLike}
        windSpeed={currentData?.windSpeed}
        precip={currentData?.precip}
        iconCode={currentData?.iconCode}
      />
      <section className="grid grid-cols-[repeat(auto-fit,100px)] gap-2 justify-center p-4">
        {dailyData.map((item, index) => (
          <DayCard
            key={index}
            iconCode={item.iconCode}
            timestamp={item.timestamp}
            degree={item.maxTemp}
          />
        ))}
      </section>

      <table className="w-full text-center border-spacing-0">
        <tbody>
          {hourlyDisplayData.map((item, index) => (
            <TableRow
              key={index}
              maxTemp={item.maxTemp}
              feelsLike={item.feelsLike}
              precip={item.precip}
              timestamp={item.timestamp}
              windSpeed={item.windSpeed}
              iconCode={item.iconCode}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}
