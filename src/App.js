import React, { useState } from "react";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import Footer from "./components/Footer";

import "./App.css";
import { object } from "prop-types";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayData = [];
    this.progge = [];

    this.state = {
      showdata: this.displayData,
      stad: undefined,
      prog: this.progge,
    };
    this.prependData = this.prependData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  prependData() {
    this.displayData.unshift(
      <div id="display-data" key="1">
        <pre>
          {this.state.stad}
          {this.props.wind}
        </pre>
      </div>
    );
    this.setState({
      showdata: this.displayData,
      stad: "",
    });
    let query = this.displayData["0"].props.children.props.children;
    this.getWeather(query, "forecast", true);


    // DENNA MÅSTE ÄNDRAS TILL FORECAST FÖR ATT MAN SKA KUNNA FÅ PROGNOSEN!
//ÄR DEN WEATHER FÅR MAN NUVARANDE VÄDER



  }
  handleChange(e) {
    let getTextAreaValue = e.target.value;
    this.setState({
      stad: getTextAreaValue,
    });
  }

  // Tool box
  convertTime = (unixTime) => {
    let dt = new Date(unixTime * 1000);
    let h = dt.getHours();
    let m = "0" + dt.getMinutes();
    let t = h + ":" + m.substr(-2);
    return t;
  };

  convertDir = (deg) => {
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
  };

  toggleUnits = () => {
    this.setState((state) => ({
      toggleunit: !state.this.toggleunit,
      latitude: this.latitude,
      longitude: this.longitude,
    }));
    this.getWeather(this.latitude, this.longitude, this.state.toggleunit);
  };

  // API call
  getWeather = async (query, apiEndpoint, toggleunit) => {
    if (apiEndpoint === "weather") {
      const apiUrl = "https://api.openweathermap.org/data/2.5/";
      const apiKey = "abafff9407e6299f362e6d1a0a127946";
      let unit = "";
      if (toggleunit) {
        unit = "metric";
      } else {
        unit = "imperial";
      }

      let api_call = await fetch(
        apiUrl + apiEndpoint + `?q=${query}&units=${unit}&appid=${apiKey}`
        //{apiUrl} + {apiEndpoint} + '?q=' + {city} + '&units=' +  {unit} + '&appid=' + {apiKey}
      );
      let data = await api_call.json();
      

      if (data.cod === 200) {
        const deg = this.convertDir(data.wind.deg);
        const sunRise = this.convertTime(data.sys.sunrise);
        const sunSet = this.convertTime(data.sys.sunset);

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
        });
      } else {
        this.setState({
          error: "Enter a city",
        });
      }
    } else if (apiEndpoint === "forecast") {
      const apiUrl = "https://api.openweathermap.org/data/2.5/";
      const apiKey = "abafff9407e6299f362e6d1a0a127946";
      let unit = "";
      if (toggleunit) {
        unit = "metric";
      } else {
        unit = "imperial";
      }

      let api_call = await fetch(
        apiUrl + apiEndpoint + `?q=${query}&units=${unit}&appid=${apiKey}`
        //{apiUrl} + {apiEndpoint} + '?q=' + {city} + '&units=' +  {unit} + '&appid=' + {apiKey}
      );

      let data = await api_call.json();
      let myarray = [] = data.list;

      myarray.forEach((element) => {
        this.progge.push(element.main.temp + "C");
        this.progge.push(element.dt_txt);
      });

      this.setState({
        prog: this.progge,
      });
    }
  };

  render() {
    return (
      <div>
        <Nav callback={this.getWeather.bind(this)} />
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
          time={this.state.time}
          prog={this.state.prog}
        />

        <div id="mainContainer">
          <textarea
            rows="1"
            cols="20"
            value={this.state.stad}
            onChange={this.handleChange}
          ></textarea>
          <div>
            <input
              type="submit"
              className="button"
              onClick={this.prependData}
              value="save this location"
            />
          </div>
          <div id="display-data-Container">{this.displayData}</div>
        </div>
      </div>
    );
  }
}

export default App;
