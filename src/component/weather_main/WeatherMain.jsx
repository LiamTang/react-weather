import React, { Component } from "react";
import "./weatherMain.scss";

export class WeatherMain extends Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
    // this.calTimeZone();
  }

  calTimeZone = () => {
    let newTime = new Date();
    let timeZone = newTime.getTimezoneOffset();
    console.log(timeZone);

    newTime.setMinutes(newTime.getMinutes() + timeZone);

    let newTimeZone = 5.5 * 60;
    newTime.setMinutes(newTime.getMinutes() + newTimeZone);
    console.log(newTime);
  };

  componentWillUnmount() {
    clearInterval(this.time);
  }

  render() {
    const { weatherInfo, weatherIcon } = this.props;
    return (
      <>
        <div className="weather-title">
          <h2>WeatherNow</h2>
        </div>
        <div className="weatherInfo">
          <div className="weatherInfo-wrap">
            {weatherInfo.slice(0, 1).map((weather) => (
              <>
                <div className="weather-desc">
                  <span className="weather-temp">{weather.temp}&deg;</span>
                  <span className="descOne">
                    Today is {weather.description}
                  </span>
                </div>
                <div className="weather-icon">
                  <i className={`wi ${weatherIcon}`} />
                </div>
              </>
            ))}
          </div>
        </div>

        <div className="otherInfo">
          <div className="otherInfo-wrap">
            <span>{this.state.time}</span>
            {weatherInfo.slice(4).map((weather) => (
              <span>
                {weather.city}, {weather.country}
              </span>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default WeatherMain;
