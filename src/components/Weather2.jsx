import React, { useState, Component } from "react";

const Weather2 = () => {
  const [city, setCity] = useState("");
  const citySearch = (e) => {
    e.preventDefault();
    getForecast2();
  };

  async function getForecast2() {
    const API_KEY = "abafff9407e6299f362e6d1a0a127946";
    const unit = "metric";
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&&appid=${API_KEY}`
    );
    const data = await api_call.json();
    localStorage.setItem("weather", JSON.stringify(data));
  }

  function getData() {
    let mydata = localStorage.getItem("weather");
    mydata = JSON.parse(mydata);
    console.log(mydata);
  }

  let weatherdata = localStorage.getItem("weather");
  weatherdata = JSON.parse(weatherdata);
  const [savedCity] = useState(weatherdata);

  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <button onClick={() => setCount(count + 1)}>hej</button> */}
      <form onSubmit={citySearch}>
        <input
          type="text"
          placeholder="sök ort här"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </form>
      <button onClick={() => getData()}>get saved weather</button>

      <div>
        <p>{savedCity.name}</p>
        <p>{savedCity.weather[0].description}</p>
        <p>{savedCity.main.temp}</p>
      </div>
    </div>
  );
};

export default Weather2;
