import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ForecastElement({
  tempday,
  unix,
  tempnight,
  tempmorn,
  weather,
  GetWeatherIcon,
  DateBuilder,
}) {
  return (
    <div className="element-container">
      <div className="date">
        <h6>{DateBuilder(new Date(unix * 1000))}</h6>
      </div>
      <div className="weather-main">
        <FontAwesomeIcon icon={GetWeatherIcon(weather, new Date())} size="2x" />
        <h6>{weather}</h6>
        <h6>{Math.round(tempday)} °c</h6>
      </div>
      <div className="element-footer">
        <div className="temp-morning">
          <h6>Morning: {Math.round(tempmorn)} °c</h6>
        </div>
        <div className="temp-evening">
          <h6>Evening: {Math.round(tempnight)} °c</h6>
        </div>
      </div>
    </div>
  );
}
