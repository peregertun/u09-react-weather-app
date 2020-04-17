import React from "react";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import Footer from "./components/Footer";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayData = [];
    this.forecastDataArray = [];

    this.state = {
      showData: this.displayData,
      city: undefined,
      prog: this.forecastDataArray,
    };
    this.prependData = this.prependData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  prependData() {
    this.displayData.unshift(
      <div id="display-data" key="1">
        <pre>{this.state.city}</pre>
      </div>
    );
    this.setState({
      showData: this.displayData,
      city: "",
    });
    let query = this.displayData["0"].props.children.props.children;
    this.getWeather(query, "forecast", true);

    // DENNA MÅSTE ÄNDRAS TILL FORECAST FÖR ATT MAN SKA KUNNA FÅ PROGNOSEN!
    //ÄR DEN WEATHER FÅR MAN NUVARANDE VÄDER
  }
  handleChange(e) {
    let getTextAreaValue = e.target.value;
    this.setState({
      city: getTextAreaValue,
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


  // API call function
  getWeather = async (query = "stockholm", toggleunit = true) => {
    const apiUrl = "https://api.openweathermap.org/data/2.5/";
    const apiKey = "abafff9407e6299f362e6d1a0a127946";



    // Toggle between Celcius (metric) and Fahrenheit (imperial)
    let unit = "";

    if (toggleunit) {
      unit = "metric";
    } else {
      unit = "imperial";
    }

    // Weather API call
    let api_call_weather = await fetch(
      apiUrl + `weather?q=${query}&units=${unit}&appid=${apiKey}`
    );
    let weatherData = await api_call_weather.json();

    // Forecast API call

    let api_call_forecast = await fetch(
      apiUrl + `forecast?q=${query}&units=${unit}&appid=${apiKey}`
    );



    let forecastData = await api_call_forecast.json();


    let forecastDataArray = ([] = forecastData.list);

    // Set states (if data is fetched)
    if (weatherData.cod === 200) {
      let deg = this.convertDir(weatherData.wind.deg);
      let sunRise = this.convertTime(weatherData.sys.sunrise);
      let sunSet = this.convertTime(weatherData.sys.sunset);



      // forecastDataArray.forEach((element) => {
      //   this.forecastDataArray.push(element.main.temp + "C");
      //   this.forecastDataArray.push(element.dt_txt);
      // });

      this.setState({
        prog: forecastData.list,
        weather: weatherData.weather["0"].description,
        icon: weatherData.weather["0"].icon,
        city: weatherData.name,
        country: weatherData.sys.country,
        temp: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        wind: weatherData.wind.speed,
        deg: deg,
        sunRise: sunRise,
        sunSet: sunSet,
        latitude: weatherData.coord.lat,
        longitude: weatherData.coord.lon,
        error: "",
      });
    } else {
      this.setState({
        error: "Enter a city",
      });
    }
  };



  render() {






    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Nav callback={this.getWeather.bind(this)} />
          </div>
        </div>
        <main className="row">
          <div className="col-12 mb-4">
            <Jumbotron />
          </div>
          <div className="col-4">
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
            />
          </div>

          <div className="col-8">

          </div>

          <div id="mainContainer">
            <textarea
              rows="1"
              cols="20"
              value={this.state.city}
              onChange={this.handleChange}
            ></textarea>
            <div>
              <input
                type="submit"
                className="button"
                onClick={this.prependData}
                value="Save this location"
              />
            </div>
            <div id="display-data-Container">{this.displayData}</div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
