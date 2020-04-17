import React from "react";
import PropTypes from "prop-types";

class Searchresult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: [],
    };

    this.saveLocation = this.saveLocation.bind(this);
  }
  
  // Save location into city state
  saveLocation() {
    this.savedLocations = this.state.city;
    this.savedLocations.push(this.props.city);
    this.setState({ city: this.savedLocations });
  }

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
              <div
                onClick={this.saveLocation}
                className="btn btn-light float-right mt-2"
              >
                <span role="img" aria-label="Save location">
                  ♥️
                </span>
                Save location
              </div>
            </div>
            <div>
              <ul>
                {this.state.city.map((item) => {
                  return (
                    <li key={item}>
                      <button onClick={() => this.handleClick(item)}>
                        {item}
                      </button>
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
