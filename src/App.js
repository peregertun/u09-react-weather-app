import React from "react";
import "./App.css";

import Jumbotron from "./components/Jumbotron";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "61dab6fb7df22a0d9bb49a92808e8af1";

class App extends React.Component {
  getWeather = async (e) => {
    e.preventDefault();
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=stockholm&appid=${API_KEY}`
    );
    const data = await api_call.json();

    console.log(data);
  }

  render() {
    return (
    <div>
      <Jumbotron />
      <Form getWeather={this.getWeather} />
      <Weather />
    </div>
    );
  }
}

export default App;
