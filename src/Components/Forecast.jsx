import React from "react";
import ForecastElement from "./ForecastElement";
import "./Forecast.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function ForecastBar({ forecast, GetWeatherIcon, DateBuilder }) {
  const HorisontalScrolling = (evt) => {
    evt = window.event || evt;
    var delta = Math.max(-1, Math.min(1, evt.wheelDelta || -evt.detail));
    document.getElementsByClassName("forecast-container")[0].scrollLeft -=
      delta * 40;
  };

  return (
    <div className="forecast-container" onWheel={HorisontalScrolling}>
      <TransitionGroup component={null}>
        {forecast.map((day, index) => (
          <CSSTransition
            key={day.temp.night}
            in={true}
            timeout={600}
            classNames="slide-up"
          >
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
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
