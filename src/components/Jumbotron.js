import React from "react";

class Jumbotron extends React.Component {
  constructor() {
    super();
    this.state = {
      weather: undefined,
      icon: undefined,
      area: undefined,
      temp: undefined,
      latitude: undefined,
      longitude: undefined,
      unit: undefined,
      toggleunit: undefined,
    };
  }

  componentDidMount() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let toggleunit = true;
        this.getWeather(latitude, longitude, toggleunit);
      });
    else console.log("geolocation is not supported");
  }

  async getWeather(latitude, longitude, toggleunit) {
    let unit;
    if (toggleunit) {
      unit = "metric";
    } else {
      unit = "imperial";
    }
    const API_KEY = "abafff9407e6299f362e6d1a0a127946";
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&&appid=${API_KEY}`
    );
    const data = await api_call.json();
    let weather = data.weather["0"].description;
    let icon = data.weather["0"].icon;
    let area = data.name;
    let country = data.sys.country;
    let temp = data.main.temp;

    this.setState({
      weather: weather,
      icon: icon,
      area: area,
      country: country,
      temp: temp,
      latitude: latitude,
      longitude: longitude,
    });
  }

  ToggleFunction = (latitude, longitude) => {
    this.setState((state) => ({
      toggleunit: !state.toggleunit,
      latitude: latitude,
      longitude: longitude,
    }));
    this.getWeather(latitude, longitude, this.state.toggleunit);
  };

  render() {
    const {
      weather,
      icon,
      area,
      country,
      temp,
      latitude,
      longitude,
    } = this.state;

    return (
      <div className="col-12">
        <div className="jumbotron">
          <h1 className="display-4">
            Weather in {area}, {country}
          </h1>
          {/* <p className="lead">Country:</p> */}
          <h2>{weather}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="Icon"
          />
          <h2>
            {temp}&deg;
            <a
              href="#"
              onClick={() => this.ToggleFunction(latitude, longitude)}
            >
              {this.state.toggleunit ? "F" : "C"}
            </a>
          </h2>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
