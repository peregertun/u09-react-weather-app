import React from "react";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import Weather from "./components/Weather";

import "./App.css";

const API_KEY = "abafff9407e6299f362e6d1a0a127946";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  getWeather = async (event, toggleunit) => {
    let unit = "";
    if (this.toggleunit) {
      unit = "metric";
    } else {
      unit = "imperial";
    }
    
    const city = event;
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
    );
    const data = await api_call.json();

    const deg = convertDir(data.wind.deg);
    const sunRise = convertTime(data.sys.sunrise);
    const sunSet = convertTime(data.sys.sunset);

    function convertTime(unixTime) {
      let dt = new Date(unixTime * 1000);
      let h = dt.getHours();
      let m = "0" + dt.getMinutes();
      let t = h + ":" + m.substr(-2);
      return t;
    }

    function convertDir(deg) {
      let compass = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
        "N",
      ];
      const index = Math.round((deg % 360) / 22.5);
      return compass[index];
    }

    if (data.cod === 200) {
      this.setState({
        weather: data.weather["0"].description,
        icon: data.weather["0"].icon,
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        deg: deg,
        sunRise: sunRise,
        sunSet: sunSet,
        latitude: data.coord.lat,
        longitude: data.coord.lon,
        error: "",
        toggleunit: true
      });
    } 
    else {
      this.setState({
        error: "Enter a city"
      });
    }
  }

  ToggleUnits = () => {
    this.setState((state) => ({
      toggleunit: !state.this.toggleunit,
      latitude: this.latitude,
      longitude: this.longitude,
    }));
    this.getWeather(this.latitude, this.longitude, this.state.toggleunit);
  };

  render() {
    return (
      <div>
        <Nav 
          callback={this.getWeather.bind(this)}
          city={this.state.city}
        />
        <Jumbotron />
        <Weather 
          weather={this.state.weather}
          icon={this.state.icon}
          city={this.state.city}
          country={this.state.country}
          temp={this.state.temp}
          feelsLike={this.state.feelsLike}
          humidity={this.state.humidity}
          wind={this.state.wind}
          deg={this.state.deg}
          sunRise={this.state.sunRise}
          sunSet={this.state.sunSet}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
          error={this.state.error}
          toggleunit={this.state.toggleunit}
        />
      </div>
    );
  }
}

export default App;