import React from "react";

export default function WeatherDisplay() {
  return (
    <div className="weather-display-wrap">
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
            <FontAwesomeIcon icon={faTachometerAlt} size="2x" color="white" />
            <h5>{weather.main.pressure} hPa</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
