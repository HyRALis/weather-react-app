import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudRain,
  faCloud,
  faSnowflake,
  faSun,
  faMoon,
  faWind,
  faCompass,
  faTint,
  faTachometerAlt,
  faTemperatureHigh,
  faTemperatureLow,
} from "@fortawesome/free-solid-svg-icons";
import { faThermometerHalf } from "@fortawesome/free-solid-svg-icons";
import SearchForm from "./Components/SearchForm";
import ForecastBar from "./Components/Forecast";
import sunrise from "./assets/images/sunrise.svg";
import sunset from "./assets/images/sunset.svg";

function App() {
  const weatherApi = {
    dayKey: "eaf2d646b99b5d978a10f99203a2278c",
    base: "https://api.openweathermap.org/data/2.5",
  };
  const googleApi = {
    key: "AIzaSyCJFnAZZjwbiOyIdYvXpiGTZJbNsIWt-8U",
    base:
      "https://maps.googleapis.com/maps/api/streetview?size=500x500&location=47.5763831,-122.4211769&fov=80&heading=70&pitch=0&key=YOUR_API_KEY",
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
    console.log(DayData);
    const fetchedForecastData = await fetch(
      `${weatherApi.base}/onecall?lat=${DayData.coord.lat}&lon=${DayData.coord.lon}&exclude=current,minutely,hourly&units=metric&appid=${weatherApi.dayKey}`
    );
    const ForecastData = await fetchedForecastData.json();
    setForecast(ForecastData.daily);
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
    } else if (weathertype === "Clear" && (hour >= 20 || hour <= 6)) {
      return "app night";
    } else if (weathertype === "Clear" && (hour > 6 || hour < 20)) {
      return "app sun";
    }
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
    } else if (weathertype === "Clear" && (hour >= 20 || hour <= 6)) {
      return faMoon;
    } else if (weathertype === "Clear" && (hour > 6 || hour < 20)) {
      return faSun;
    }
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
            <div className="infobar">
              <h1>
                {weather.name}, {weather.sys.country}
              </h1>
              <h4>{dateBuilder(new Date())}</h4>
              <div className="coord-container">
                <h2>Coordinates:</h2>
                <h4>Longitude: {weather.coord.lon}</h4>
                <h4>Latitude: {weather.coord.lat}</h4>
              </div>
              <div className="day-info">
                <div className="sun-position">
                  <img src={sunrise} alt="Sunrise Time" />
                  <h4>{timeBuilder(weather.sys.sunrise)}</h4>
                </div>
                <div className="sun-position">
                  <img src={sunset} alt="Sunset time" />
                  <h4>{timeBuilder(weather.sys.sunset)}</h4>
                </div>
              </div>
            </div>
            <div className="weather-type">
              <FontAwesomeIcon
                icon={getWeatherIcon(weather.weather[0].main, new Date())}
                size="8x"
                color="white"
              />
              <h4>{weather.weather[0].main}</h4>
            </div>
            <div className="more-info">
              <div className="temperature">
                <FontAwesomeIcon
                  icon={temperatureIcon(Math.round(weather.main.temp))}
                  size="4x"
                  color="white"
                />
                <div>
                  <h4>Teamperature: {Math.round(weather.main.temp)}°c</h4>
                  <h4>RealFeal: {Math.round(weather.main.feels_like)}°c</h4>
                </div>
              </div>
              <div className="wind">
                <h4>Wind:</h4>
                <div>
                  <FontAwesomeIcon icon={faWind} size="2x" color="white" />{" "}
                  <h5>{weather.wind.speed} m/s</h5>
                  <FontAwesomeIcon icon={faCompass} size="2x" color="white" />
                  <h5>{weather.wind.deg}°</h5>
                </div>
              </div>
              <div className="humidity">
                <h4>Humidity:</h4>
                <div>
                  <FontAwesomeIcon icon={faTint} size="2x" color="white" />{" "}
                  <h5>{weather.main.humidity}%</h5>
                </div>
              </div>
              <div className="preasure">
                <h4>Air preasure:</h4>
                <div>
                  <FontAwesomeIcon
                    icon={faTachometerAlt}
                    size="2x"
                    color="white"
                  />
                  <h5>{weather.main.pressure} hPa</h5>
                </div>
              </div>
            </div>
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
