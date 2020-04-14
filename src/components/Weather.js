import React from "react";

class Weather extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
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
                className="tab-pane fade show active mt-5"
                id="current-weathere"
                role="tabpanel"
                aria-labelledby="current-weather-tab"
              >
                {this.props.city && this.props.country && (
                  <p>
                    Location: {this.props.city}, {this.props.country}
                  </p>
                )}
                {this.props.temperature && (
                  <p>Temperature: {this.props.temperature}</p>
                )}
                {this.props.wind && <p>Wind force: {this.props.wind}</p>}
                {this.props.humidity && <p>Humidity: {this.props.humidity}</p>}
                {this.props.description && (
                  <p>Conditions: {this.props.description}</p>
                )}
                {this.props.sunrise && <p>Sunrise: {this.props.sunrise}</p>}
                {this.props.sunset && <p>Sunset: {this.props.sunset}</p>}
                {this.props.error && <p>{this.props.error}</p>}
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
