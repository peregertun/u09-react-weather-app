import React from "react";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import Searchresult from "./components/Searchresult";
import Footer from "./components/Footer";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.forecastDataArray = [];

    this.state = {
      city: undefined,
      prog: this.forecastDataArray,
      unit: "metric",
    };
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
  getWeather = async (query = "", toggleunit = true) => {
    const apiUrl = "https://api.openweathermap.org/data/2.5/";
    const apiKey = "61dab6fb7df22a0d9bb49a92808e8af1";

    // Toggle between Celcius (metric) and Fahrenheit (imperial)
    let unit = "";

    if (toggleunit) {
      unit = "metric";
    } else {
      unit = "imperial";
    }

    // Weather API call
    let api_call_weather = await fetch(
      apiUrl + `weather?q=${query}&units=${this.state.unit}&appid=${apiKey}`
    );
    let weatherData = await api_call_weather.json();

    // Forecast API call
    let api_call_forecast = await fetch(
      apiUrl + `forecast?q=${query}&units=${this.state.unit}&appid=${apiKey}`
    );

    let forecastData = await api_call_forecast.json();

    //let forecastDataArray = ([] = forecastData.list);

    // Set states (if data is fetched)
    if (weatherData.cod === 200) {
      let deg = this.convertDir(weatherData.wind.deg);
      let sunRise = this.convertTime(weatherData.sys.sunrise);
      let sunSet = this.convertTime(weatherData.sys.sunset);

      this.setState({
        prog: forecastData,
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
        prog: forecastData,

      });
    } else {
      this.setState({
        error: "Enter a city",
      });
    }
    console.log(weatherData)
  };

  toggleUnit = () => {

    if (this.state.unit === "metric") {
      this.setState({
        unit: "imperial"
      })
    } else if (this.state.unit === "imperial") {
      this.setState({
        unit: "metric"
      })
    }
    setTimeout(function () { this.getWeather(); }.bind(this), 500);


  }

  ToggleUnitz = () => {
    this.refs.jumbotron.toggleUnitsFromApp(this.state.latitude, this.state.longitude);
    this.toggleUnit()
  }

  celFarButton = () => {
    if (this.state.unit === "metric") {
      return "C"
    } else if (this.state.unit === "imperial") {
      return "F"
    }
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Nav callback={this.getWeather.bind(this)} />
                <div className="d-flex justify-content-center align-items-center mb-4 mt-4">
                  <span className="text-uppercase font-weight-bold">Choose temperature unit:</span><div className="ml-2 btn btn-primary font-weight-bold" onClick={this.ToggleUnitz}>{this.celFarButton()}</div>
                </div>
              </div>
            </div>
            <main>
              <div className="row">
                <div className="col-12 mb-4">
                  <Jumbotron ref="jumbotron" />
                </div>
              </div>

              <div className="row">
                <div className="col-xl-4 col-12 mb-2">
                  <Searchresult
                    callback={this.getWeather.bind(this)}
                    city={this.state.city}
                  />
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

                {this.state.city && (
                  <div className="col-xl-8 col-12 mb-2">
                    {typeof this.state.prog != "undefined" ? (
                      <Forecast prog={this.state.prog} />
                    ) : (
                        ""
                      )}
                  </div>
                )}
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
