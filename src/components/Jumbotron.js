import React from "react";
import Forecast from "./Forecast";
import Graph from "./Graph";

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
    else console.log("Geolocation is not supported");
  }

  async getWeather(latitude, longitude, toggleunit) {
    let unit;
    if (toggleunit) {
      unit = "metric";
    } else {
      unit = "imperial";
    }
    const API_KEY = "61dab6fb7df22a0d9bb49a92808e8af1";
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&&appid=${API_KEY}`
    );
    const data = await api_call.json();

    const api_forecast_call = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&&appid=${API_KEY}`
    );

    const forecast_data = await api_forecast_call.json();

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
    if (forecast_data) {
      this.setState({
        forecast: forecast_data,
        unit: unit,
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

  toggleUnitsFromApp = () => {
    console.log("finc i jumbotron")
    this.setState((state) => ({
      toggleunit: !state.toggleunit,

    }));
    this.getWeather(this.state.latitude, this.state.longitude, this.state.toggleunit);
  }

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
      forecast,
      unit,
    } = this.state;
    // console.log(forecast);
    return (
      <div>
        <div className="card mb-2">
          <span className="text-uppercase text-center font-weight-bold p-1 bg-dark text-light">
            Your local weather:
          </span>
        </div>
        {area && (
          <div>
            <div className="jumbotron text-center">
              <h1 className="display-4">
                {area}, {country}
              </h1>
              <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="Icon"
              />
              <h2 className="text-capitalize">{weather}</h2>
              {area && feelsLike && (
                <h2>
                  <span className="text-muted">Temperature:</span> {temp}&deg;
                  <span className="text-muted">
                    , feels like {feelsLike}&deg;
                  </span>
                </h2>
              )}
              <ul className="list-unstyled list-group">
                {sunRise && sunSet && (
                  <li>
                    The sun rises at <strong>{sunRise}</strong> and sets at:{" "}
                    <strong>{sunSet}</strong> (local time).
                  </li>
                )}
                {wind && deg && humidity && (
                  <li>
                    Wind force:{" "}
                    <strong>
                      {wind} {deg}
                    </strong>{" "}
                    and humidity: <strong>{humidity}</strong>.
                  </li>
                )}
              </ul>
              {/* {area && (
                <button href="/" className="btn btn-light float-right mt-2">
                  <span role="img" aria-label="Save location">
                    ♥️
                  </span>
                  Save location
                </button>
              )} */}
            </div>
          </div>
        )}
        {forecast && <Forecast prog={forecast} unit={unit} />}
        {forecast && <Graph prog={forecast} />}
      </div>
    );
  }
}

export default Jumbotron;
