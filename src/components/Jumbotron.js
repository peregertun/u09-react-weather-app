import React from "react";

class Jumbotron extends React.Component {
  constructor() {
    super();
    this.state = {
      weather: undefined,
      icon: undefined,
      area: undefined,
      temp: undefined,
    };
  }

  componentDidMount() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        this.getWeather(latitude, longitude);
      });
    else console.log("geolocation is not supported");
  }

  async getWeather(latitude, longitude) {
    const API_KEY = "abafff9407e6299f362e6d1a0a127946";
    let unit = "metric";
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&&appid=${API_KEY}`
    );
    const data = await api_call.json();
    console.log(data);
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
    });
  }

  render() {
    const { weather, icon, area, country, temp } = this.state;
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
          <h2>{temp}&deg;C</h2>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
