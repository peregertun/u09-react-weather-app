import React from "react";

class Jumbotron extends React.Component {
  constructor() {
    super();
    this.state = {};
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

    let deg = convertWindDir(data.wind.deg);
    let sunRise = convertTime(data.sys.sunrise);
    let sunSet = convertTime(data.sys.sunset);

    function convertTime(unixTime) {
      let dt = new Date(unixTime * 1000);
      let h = dt.getHours();
      let m = "0" + dt.getMinutes();
      let t = h + ":" + m.substr(-2);
      return t;
    }

    function convertWindDir(deg) {
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
      let index = Math.round((deg % 360) / 22.5);
      return compass[index];
    }

    if (data) {
      this.setState({
        weather: data.weather["0"].description,
        icon: data.weather["0"].icon,
        area: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        latitude: latitude,
        longitude: longitude,
        wind: data.wind.speed,
        deg: deg,
        sunRise: sunRise,
        sunSet: sunSet,
      });
    }
  }

  ToggleUnits = (latitude, longitude) => {
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
      feelsLike,
      humidity,
      wind,
      deg,
      sunRise,
      sunSet,
      latitude,
      longitude,
    } = this.state;

    return (
      <div className="col-12">
        <div className="jumbotron">
          <h1 className="display-4">
            Weather in {area}, {country}
          </h1>
          <h2>{weather}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="Icon"
          />
          <h2>
            {temp}&deg;
            <button onClick={() => this.ToggleUnits(latitude, longitude)}>
              {this.state.toggleunit ? "F" : "C"}
            </button>
          </h2>
          <p>Feels like {feelsLike}</p>
          <div>
            <p>Sunrise: {sunRise}</p>
            <p>Sunset: {sunSet}</p>
            <p>
              Wind: {wind} {deg}
            </p>
            <p>Air: {humidity}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
