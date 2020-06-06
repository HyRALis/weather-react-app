import React, { useState } from "react";

import {
  faCloudRain,
  faCloud,
  faSnowflake,
  faSun,
  faMoon,
  faTemperatureHigh,
  faTemperatureLow,
  faThermometerHalf,
  faBolt,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SearchForm from "./Components/SearchForm";
import ForecastBar from "./Components/Forecast";
import WeatherDisplay from "./Components/WeatherDisplay";

function App() {
  const weatherApi = {
    dayKey: "eaf2d646b99b5d978a10f99203a2278c",
    base: "https://api.openweathermap.org/data/2.5",
  };

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const getDayData = async () => {
    const fetchedDayData = await fetch(
      `${weatherApi.base}/weather?q=${city},${country}&units=metric&APPID=${weatherApi.dayKey}`
    );
    const DayData = await fetchedDayData.json();
    setWeather(DayData);
    if (typeof DayData.coord != "undefined") {
      const fetchedForecastData = await fetch(
        `${weatherApi.base}/onecall?lat=${DayData.coord.lat}&lon=${DayData.coord.lon}&exclude=current,minutely,hourly&units=metric&appid=${weatherApi.dayKey}`
      );
      const ForecastData = await fetchedForecastData.json();
      setForecast(ForecastData.daily);
    }
    setCity("");
    setCountry("");
  };
  const search = async (evt) => {
    if (evt.key === "Enter") {
      getDayData();
    }
  };
  const imgBcSelector = (weathertype, date) => {
    let hour = date.getHours();
    if (weathertype === "Clouds") {
      return "app clouds";
    } else if (weathertype === "Rain") {
      return "app rain";
    } else if (weathertype === "Snow") {
      return "app snow";
    } else if (weathertype === "Thunderstorm") {
      return "app thunderstorm";
    } else if (weathertype === "Clear" && (hour >= 20 || hour <= 6)) {
      return "app night";
    } else if (weathertype === "Clear" && (hour > 6 || hour < 20)) {
      return "app sun";
    } else return "app fog";
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date}-${month}-${year}`;
  };
  const timeBuilder = (time) => {
    let date = new Date(time * 1000);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    return `${format(hour)}:${format(minutes)}`;
  };
  const format = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };
  const getWeatherIcon = (weathertype, date) => {
    let hour = date.getHours();
    if (weathertype === "Clouds") {
      return faCloud;
    } else if (weathertype === "Rain") {
      return faCloudRain;
    } else if (weathertype === "Snow") {
      return faSnowflake;
    } else if (weathertype === "Thunderstorm") {
      return faBolt;
    } else if (weathertype === "Clear" && (hour >= 20 || hour <= 6)) {
      return faMoon;
    } else if (weathertype === "Clear" && (hour > 6 || hour < 20)) {
      return faSun;
    } else return faSmog;
  };
  const temperatureIcon = (temp) => {
    if (temp >= 25) {
      return faTemperatureHigh;
    } else if (temp < 25 && temp > 5) {
      return faThermometerHalf;
    } else {
      return faTemperatureLow;
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? imgBcSelector(weather.weather[0].main, new Date())
          : "app"
      }
    >
      <main>
        <SearchForm
          City={city}
          Country={country}
          SetCity={setCity}
          SetCountry={setCountry}
          Search={search}
          GetData={getDayData}
        />
        {typeof weather.main != "undefined" ? (
          <div className="main-container">
            <TransitionGroup>
              <CSSTransition
                key={weather.name}
                appear={true}
                in={true}
                timeout={600}
                classNames="fade"
              >
                <WeatherDisplay
                  TimeBuilder={timeBuilder}
                  DateBuilder={dateBuilder}
                  Weather={weather}
                  GetWeatherIcon={getWeatherIcon}
                  TemperatureIcon={temperatureIcon}
                />
              </CSSTransition>
            </TransitionGroup>
            <ForecastBar
              forecast={forecast}
              GetWeatherIcon={getWeatherIcon}
              DateBuilder={dateBuilder}
            />
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
