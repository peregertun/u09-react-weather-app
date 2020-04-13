import React from "react";
import Form from "./Form";

const API_KEY = "61dab6fb7df22a0d9bb49a92808e8af1";

class Nav extends React.Component {
  
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const cityWeather = await api_call.json();

    console.log(cityWeather);

    if (city) {
      this.setState({
        city: cityWeather.name,
        country: cityWeather.sys.country,
        temperature: cityWeather.main.temp,
        wind: cityWeather.wind.speed,
        humidity: cityWeather.main.humidity,
        description: cityWeather.weather[0].description,
        sunrise: cityWeather.sys.sunrise,
        sunset: cityWeather.sys.sunset,
        error: "",
      });

    } else {
      this.setState({
        city: undefined,
        country: undefined,
        temperature: undefined,
        wind: undefined,
        humidity: undefined,
        description: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Please enter a city",
      });
    }
  };

  render() {
    return (
      <div className="col-12">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Weather App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav mr-auto">
            - Built in React
            </div>
            <Form getWeather={this.getWeather} />
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
