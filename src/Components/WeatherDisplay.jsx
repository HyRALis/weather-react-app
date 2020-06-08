import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faTint,
  faTachometerAlt,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import sunrise from "../assets/images/sunrise.svg";
import sunset from "../assets/images/sunset.svg";

export default function WeatherDisplay({
  TimeBuilder,
  DateBuilder,
  Weather,
  GetWeatherIcon,
  TemperatureIcon,
}) {
  return (
    <div className="weather-display-wrap">
      <div className="infobar">
        <h1>
          {Weather.name}, {Weather.sys.country}
        </h1>
        <h4>{DateBuilder(new Date())}</h4>
        <div className="aditional-info">
          <div className="coord-container">
            <h2>Coordinates:</h2>
            <h4>Longitude: {Weather.coord.lon}</h4>
            <h4>Latitude: {Weather.coord.lat}</h4>
          </div>
          <div className="day-info">
            <div className="sun-position">
              <img src={sunrise} alt="Sunrise Time" />
              <h4>{TimeBuilder(Weather.sys.sunrise)}</h4>
            </div>
            <div className="sun-position">
              <img src={sunset} alt="Sunset time" />
              <h4>{TimeBuilder(Weather.sys.sunset)}</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="weather-type">
        <FontAwesomeIcon
          icon={GetWeatherIcon(Weather.weather[0].main, new Date())}
          size="8x"
          color="white"
        />
        <h4>{Weather.weather[0].main}</h4>
      </div>
      <div className="more-info">
        <div className="temperature">
          <FontAwesomeIcon
            icon={TemperatureIcon(Math.round(Weather.main.temp))}
            size="4x"
            color="white"
          />
          <div>
            <h4>Teamperature: {Math.round(Weather.main.temp)}°c</h4>
            <h4>RealFeal: {Math.round(Weather.main.feels_like)}°c</h4>
          </div>
        </div>
        <div className="weather-props">
          <div className="wind">
            <h4>Wind:</h4>
            <div>
              <FontAwesomeIcon icon={faWind} size="2x" color="white" />{" "}
              <h5>{Weather.wind.speed} m/s</h5>
              <FontAwesomeIcon icon={faCompass} size="2x" color="white" />
              <h5>{Weather.wind.deg}°</h5>
            </div>
          </div>
          <div className="humidity">
            <h4>Humidity:</h4>
            <div>
              <FontAwesomeIcon icon={faTint} size="2x" color="white" />{" "}
              <h5>{Weather.main.humidity}%</h5>
            </div>
          </div>
          <div className="preasure">
            <h4>Air preasure:</h4>
            <div>
              <FontAwesomeIcon icon={faTachometerAlt} size="2x" color="white" />
              <h5>{Weather.main.pressure} hPa</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
