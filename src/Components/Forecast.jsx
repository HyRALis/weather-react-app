import React from "react";
import ForecastElement from "./ForecastElement";
import "./Forecast.css";

export default function ForecastBar({ forecast, GetWeatherIcon, DateBuilder }) {
  const HorisontalScrolling = (evt) => {
    evt = window.event || evt;
    var delta = Math.max(-1, Math.min(1, evt.wheelDelta || -evt.detail));
    document.getElementsByClassName("forecast-container")[0].scrollLeft -=
      delta * 40;
  };

  return (
    <div className="forecast-container" onWheel={HorisontalScrolling}>
      {forecast.map((day, index) => (
        <ForecastElement
          key={day.dt}
          GetWeatherIcon={GetWeatherIcon}
          DateBuilder={DateBuilder}
          tempnight={day.temp.night}
          tempmorn={day.temp.morn}
          tempday={day.temp.day}
          weather={day.weather[0].main}
          unix={day.dt}
        />
      ))}
    </div>
  );
}
