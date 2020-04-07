import React from "react";
import Form from "./components/form";
import Footer from "./components/footer";
import "./App.css";

function App() {
  function getLocalWeather() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(function (position) {
        // console.log(position.coords.latitude);
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        const API_KEY = "abafff9407e6299f362e6d1a0a127946";
        // const api_call = await fetch(
        // `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        //     );
        //     const data = await api_call.json();
        //     console.log(data);
      });
    else console.log("geolocation is not supported");
  }

  // getWeather = async (e: any) => {
  //   e.preventDefault();
  //   const searchQuery = e.target.elements.searchQuery.value;
  //   const api_call = await fetch(
  //     `api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${API_KEY}`
  //   );
  //   const data = await api_call.json();
  //   console.log(data);
  // }

  return (
    <div className="main">
      <Form />
      <h1>u09-react-weather-app</h1>

      <div id="flex-container">
        <div id="smallCard">nåt</div>
        <div id="smallCard">nåt annat</div>
        <div id="smallCard">
          <button id="location-button" onClick={getLocalWeather}>
            Get local weather
          </button>
        </div>
      </div>

      <div id="card">nån component</div>

      <Footer />
    </div>
  );
}

export default App;
