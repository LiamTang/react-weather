import React, { Component } from "react";
import "./weatherDetail.scss";

export class WeatherDetail extends Component {
  render() {
    const { weatherInfo } = this.props;
    console.log(weatherInfo);
    return (
      <div className="weather-detail">
        <div className="weather-detail-Info">
          <h3>Weather Details</h3>
          {/* show the today's weather details */}
          {weatherInfo.slice(0, 1).map((weather) => (
            <div>
              <p>
                <span className="fontColor1">Humidity:</span>
                <span className="fontColor2">{weather.humidity}% </span>
              </p>
              <p>
                <span className="fontColor1">Wind:</span>
                <span className="fontColor2">{weather.wind}K/M </span>
              </p>
              <p>
                <span className="fontColor1">Sunrise:</span>
                <span className="fontColor2">{weather.sunrise}</span>
              </p>
              <p>
                <span className="fontColor1">Sunset:</span>
                <span className="fontColor2">{weather.sunset}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="future-weather-info">
          <h3>Next Days</h3>
          {/* show next four days weather temperature */}
          {weatherInfo.slice(1).map((weather) => (
            <p>
              <span className="fontColor1">{weather.date.slice(5, 10)}</span>
              <span className="fontColor2">{weather.temp}&deg;</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default WeatherDetail;
