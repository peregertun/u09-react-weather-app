import React from "react";
import PropTypes from "prop-types";

class Searchresult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: [],
    };

    localStorage.setItem("cityStorage", JSON.stringify(this.state.city));

    this.saveLocation = this.saveLocation.bind(this);
  }

  // Save location into city state
  saveLocation() {
    this.savedLocations = this.state.city;
    this.savedLocations.push(this.props.city);

    let alreadyExist = false;

    // Check if there's a localstorage
    if (localStorage.getItem("cityStorage") === null) {
      this.setState({ city: this.savedLocations });
      localStorage.setItem("cityStorage", JSON.stringify(this.savedLocations));
    } else {
      let cityStorage = JSON.parse(localStorage.getItem("cityStorage"));

      // Check if searched city alruady exists in localStorage
      for (let i = 0; i < cityStorage.length; i++) {
        if (cityStorage[i] === this.props.city) {
          alreadyExist = true;
          i = 1000000000000000000;
        }
      }

      // If city doesn't exist, write it to localStorage
      if (!alreadyExist) {
        this.setState({ city: this.savedLocations });
        cityStorage.push(this.props.city);
        localStorage.setItem("cityStorage", JSON.stringify(cityStorage));
      }
    }
  }

  // Remove city from localStorage and update state
  removeLocation(city) {
    let cityStorage = JSON.parse(localStorage.getItem("cityStorage"));
    for (let i = 0; i < cityStorage.length; i++) {
      if (cityStorage[i] === city) {
        cityStorage.splice(i, 1);
        i = 1000000000000000000;
      }
    }
    localStorage.setItem("cityStorage", JSON.stringify(cityStorage));
    this.setState({ city: cityStorage });
  }

  // Callback to use getWeather-function (api call) in app component
  handleClick(city) {
    this.props.callback(city);
  }

  render() {
    return (
      <div>
        {this.props.city && (
          <div className="card mb-2 text-center bg-dark text-light p-4">
            <span className="text-uppercase">You searched for:</span>
            <h3 className="text-uppercase">
              <strong>{this.props.city}</strong>
            </h3>
            <div>
              <button
                onClick={this.saveLocation}
                className="btn btn-primary mt-2"
              >
                <span role="img" aria-label="Save location">
                  ♥️
                </span>
                &nbsp;Save location
              </button>
            </div>
            <div className="mt-5 mb-2">
              <span className="text-uppercase mb-2">
                List of favorite cities:
              </span>
              <ul className="list-unstyled">
                {JSON.parse(localStorage.getItem("cityStorage")).map((item) => {
                  return (
                    <li key={item}>
                      <button
                        className="btn btn-dark"
                        onClick={() => this.handleClick(item)}
                      >
                        <strong>{item}</strong>
                      </button>
                      <div
                        onClick={() => this.removeLocation(item)}
                        className="btn btn-sm btn-danger"
                      >
                        <strong>X</strong>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Searchresult.protoTypes = {
  callback: PropTypes.func,
};

export default Searchresult;
