import React from "react";

class Weather extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     toggleunit: this.state.toggleunit
  //   };
  // }

  // ToggleUnits = () => {
  //   if (this.state.toggleunit) {
  //     this.setState({toggleunit: false})
  //   } else {
  //     this.setState({toggleunit: true})
  //   }
  // }

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <div className="row">
          <div className="col-⁄⁄⁄⁄⁄⁄⁄⁄">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="current-weather-tab"
                  data-toggle="tab"
                  href="#current-weather"
                  role="tab"
                  aria-controls="current-weather"
                  aria-selected="true"
                >
                  Current weather
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  5-day forecast
                </a>
              </li>
            </ul>

            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active mt-4"
                id="current-weathere"
                role="tabpanel"
                aria-labelledby="current-weather-tab"
              >
                {this.props.city && this.props.country && (
                  <div>
                    <span className="muted-text">Location: </span>
                    <h3>
                      {this.props.city}, {this.props.country}
                    </h3>
                  </div>
                )}

                {this.props.icon &&
                  this.props.temp &&
                  this.props.feelsLike &&
                  this.props.weather && (
                    <div>
                      <h4>
                        {this.props.temp}&deg;{" "}
                        <span className="text-muted">
                          , feels like: {this.props.feelsLike}&deg;
                        </span>
                      </h4>
                      <img
                        src={`http://openweathermap.org/img/wn/${this.props.icon}@2x.png`}
                        alt="Icon"
                        width="50"
                        height="50"
                      />
                      <p className="text-capitalize">{this.props.weather}</p>
                    </div>
                  )}

                {/* {this.props.temp && this.props.latitude && this.props.longitude &&
                <button onClick={() => this.ToggleUnits(this.props.toggleunit)}>
                  {this.props.toggleunit ? "F" : "C"}
                </button>} */}

                <ul className="list-group">
                  {this.props.wind && this.props.deg && (
                    <li className="list-group-item">
                      Wind force: {this.props.wind} {this.props.deg}
                    </li>
                  )}
                  {this.props.humidity && (
                    <li className="list-group-item">
                      Humidity: {this.props.humidity}
                    </li>
                  )}
                  {this.props.sunRise && (
                    <li className="list-group-item">
                      Sunrise: {this.props.sunRise}
                    </li>
                  )}
                  {this.props.sunSet && (
                    <li className="list-group-item">
                      Sunset: {this.props.sunSet}
                    </li>
                  )}
                  {this.props.error && (
                    <li className="list-group-item">{this.props.error}</li>
                  )}
                </ul>
              </div>

              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                ...
              </div>

              <div
                className="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                ...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
