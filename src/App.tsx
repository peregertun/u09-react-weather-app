// import Form from "./components/form";
import Form2 from "./components/form2";
import Footer from "./components/footer";
import "./App.css";
import React from "react";

interface IProps {}

interface IState {
  lat: number;
  lon: number;
  weather: string;
  icon: string;
  area: string;
  temp: number;
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      lat: 1,
      lon: 1,
      weather: "",
      icon: "",
      area: "",
      temp: 1,
    };
  }

  //comdidmount körs innan rendering
  componentDidMount() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        this.setState({ lat: latitude, lon: longitude });
        this.getWeather(latitude, longitude);
      });
    else console.log("geolocation is not supported");
  }

  componentDidUpdate() {}
  async getWeather(lat: number, lon: number) {
    const API_KEY = "abafff9407e6299f362e6d1a0a127946";
    let unit = "metric";
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&&appid=${API_KEY}`
    );
    const data = await api_call.json();

    let weather = data.weather["0"].description;
    let icon = data.weather["0"].icon;
    let area = data.name;
    let temp = data.main.temp;
    this.setState({ weather: weather, icon: icon, area: area, temp: temp });
  }

  render() {
    const { weather, icon, area, temp } = this.state;
    return (
      <div className="main">
        {/* <Form /> */}
        {/* <Form2 /> */}
        <h1>u09-react-weather-app</h1>
        <h2>{area}</h2>
        <h2>{temp}°</h2>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="Icon"
        />
        <p>{weather}</p>
        <div id="flex-container">
          <div id="smallCard">
            <h2>Saved location</h2>
            <h2>{temp}°</h2>
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="Icon"
            />
            <p>{weather}</p>
          </div>
          <div id="smallCard">
            <h2>Saved location</h2>
            <Form2 />
          </div>
          <div id="smallCard">
            <h2>Saved location</h2>
            <Form2 />
            {/* <Weather /> */}
            {/* <button id="location-button" onClick={this.getLocation}>
              Get location
            </button> */}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
