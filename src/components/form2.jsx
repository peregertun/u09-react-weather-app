import React, { useState } from "react";
import { API, API_KEY } from "../config";

const Form2 = () => {
  const [city, setCity] = useState("");
  const citySearch = (e) => {
    e.preventDefault();
    getForecast2();

  };

  async function getForecast2() {
    console.log(city);
    // const api_call = await fetch(`${API}forecast?q=${city}&appid=${API_KEY}&units=metric`);
    const api_call = await fetch(
      `${API}weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await api_call.json();
    console.log(data);
    let weather = data.weather["0"].description;
    let icon = data.weather["0"].icon;
    let area = data.name;
    let temp = data.main.temp;
    this.setState({ weather: weather, icon: icon, area: area, temp: temp });
    console.log(weather);

    // let arr = [];
    // Object.keys(data.list).forEach(function(key) {
    //   arr.push(data[key]);
    // console.log(arr);
    // });
  }

  const [value, setValue] = React.useState(
    localStorage.getItem("myValueInLocalStorage") || ""
  );
  React.useEffect(() => {
    localStorage.setItem("myValueInLocalStorage", value);
  }, [value]);
  const onChange = (event) => setValue(event.target.value);

  return (
    <div>
      <form onSubmit={citySearch}>
        <input
          type="text"
          placeholder="sök ort här"
          // id="searchField"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </form>

      <input
        placeholder="testa spara text här"
        value={value}
        type="text"
        onChange={onChange}
      />
      <p>{value}</p>
    </div>
  );
};

export default Form2;
