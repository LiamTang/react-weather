import React from "react";

import "./App.scss";
import "weather-icons/css/weather-icons.css";

import SearchBar from "./component/search_bar/SearchBar";
import WeatherMain from "./component/weather_main/WeatherMain";
import WeatherDetail from "./component/weather_detail/WeatherDetail";

const API_key = "c8e76c9b4fa36112b0d8aff693cee1fc";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherInfo: new Array(5),
      weatherIcon: undefined,
    };

    this.weatherIcon = {
      thunderstorm: "wi-thunderstorm",
      drizzle: "wi-sleet",
      rain: "wi-storm-showers",
      snow: "wi-snow",
      atmosphere: "wi-fog",
      clear: "wi-day-sunny",
      clouds: "wi-day-fog",
    };
  }

  getWeatherIcons(weatherIcon, range) {
    if (!(range >= 200 && range <= 232))
      if (range >= 300 && range <= 321) {
        this.setState({ weatherIcon: this.weatherIcon.drizzle });
      } else if (range >= 500 && range <= 531) {
        this.setState({ weatherIcon: this.weatherIcon.rain });
      } else if (range >= 600 && range <= 622) {
        this.setState({ weatherIcon: this.weatherIcon.snow });
      } else if (range >= 701 && range <= 781) {
        this.setState({ weatherIcon: this.weatherIcon.atmosphere });
      } else if (range === 800) {
        this.setState({ weatherIcon: this.weatherIcon.clear });
      } else if (range >= 801 && range <= 804) {
        this.setState({ weatherIcon: this.weatherIcon.clouds });
      } else {
        this.setState({ weatherIcon: this.weatherIcon.clear });
      }
    else {
      this.setState({ weatherIcon: this.weatherIcon.thunderstorm });
    }
  }

  calculateCelsius = (temp) => Math.floor(temp - 273.15);

  //convert the unix time to the normal time with hours and minutes
  calNormalTime = (unixTime) => {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let minutes = ("0" + date.getMinutes()).substr(-2);
    let normalTime = `${hours}:${minutes}`;
    return normalTime;
  };

  callApi = async (city) => {
    const api = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}`;
    const response = await (await fetch(api)).json();
    this.getWeather(response);
    // console.log(response);
  };

  getWeather = (response) => {
    const weatherInfo = [];
    const dayIndex = this.getDayIndex(response);

    //get further four days weather information
    for (let i = 0; i < 5; i++) {
      weatherInfo.push({
        date: response.list[dayIndex[i]].dt_txt,
        temp: this.calculateCelsius(response.list[dayIndex[i]].main.temp),
        city: response.city.name,
        country: response.city.country,
        humidity: response.list[dayIndex[i]].main.humidity,
        wind: response.list[dayIndex[i]].wind.speed,
        sunrise: this.calNormalTime(response.city.sunrise),
        sunset: this.calNormalTime(response.city.sunset),
        description: response.list[dayIndex[i]].weather[0].description,
        icon: this.getWeatherIcons(
          this.weatherIcon,
          response.list[dayIndex[i]].weather[0].id
        ),
      });
      console.log("temp", weatherInfo);
    }

    this.setState({
      weatherInfo: weatherInfo,
    });
  };

  getDayIndex = (data) => {
    let index;
    const currentHour = new Date().getHours();
    const hours = [currentHour];

    /* compare to the current hour, determine where the index starts  */
    for (let a = 0; a < 5; a++) {
      let listHours = Number(data.list[a].dt_txt.slice(11, 13));
      hours.push(listHours);
      hours.sort((a, b) => a - b);
      // console.log(hours)
      //determine the init index, this index is the closet one compare to the current hour
      index = hours.indexOf(currentHour) - 1;
    }
    let dayIndex = [index];
    let tmp = data.list[index].dt_txt.slice(8, 10);

    //get the index of list in api
    //Make the 12am temperature as the next four days temperature
    for (let i = 0; i < 4; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== "12"
      ) {
        index++;
      }
      dayIndex.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    // console.log(dayIndex);
    return dayIndex;
  };

  componentDidMount() {
    this.callApi("sydney");
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="card">
            <div className="card-left">
              <WeatherMain
                weatherInfo={this.state.weatherInfo}
                weatherIcon={this.state.weatherIcon}
              />
            </div>
            <div className="card-right">
              <SearchBar callApi={this.callApi} />
              <WeatherDetail weatherInfo={this.state.weatherInfo} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
