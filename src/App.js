import React from "react";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import Weather from "./components/Weather";

import "./App.css";

const API_KEY = "61dab6fb7df22a0d9bb49a92808e8af1";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      city: "",
      country: undefined,
      temperature: undefined,
      wind: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }
  }

  navWeather = async (event) => {
    const city = event;
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const cityWeather = await api_call.json();
    console.log(cityWeather);

    if (cityWeather.cod === 200) {
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
    } 
    else {
      this.setState({
        error: "Enter a city"
      });
    }
  }

  render() {
    return (
      <div>
        <Nav 
          callback={this.navWeather.bind(this)}
          city={this.state.city}
        />
        <Jumbotron />
        <Weather 
          city={this.state.city}
          country={this.state.country}
          temperature={this.state.temperature}
          wind={this.state.wind}
          humidity={this.state.humidity}
          description={this.state.description}
          sunrise={this.state.sunrise}
          sunset={this.state.sunrise}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;