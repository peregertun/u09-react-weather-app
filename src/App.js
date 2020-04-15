import React from "react";
import "./App.css";

import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
// import Weather from "./components/Weather";
import Weather2 from "./components/Weather2.jsx";
// import Form from "./components/form";
import Form2 from "./components/test";

class App extends React.Component {

  state = {
    city: undefined,
    country: undefined,
    temperature: undefined,
    wind: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  };

  //const [city, setCity] = React.useState('city');
  //city = React.useState();
  
  render() {
    return (
      <div>
        <Nav 
          city={this.state.city}
          country={this.state.country}
          temperature={this.state.temperature}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />

        <Jumbotron />
        <Form2 />
        {/* <Weather
          city={this.state.city}
          country={this.state.country}
          temperature={this.state.temperature}
          wind={this.state.wind}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        /> */}
        <Weather2 />

      </div>
    );
  }
}

export default App;
