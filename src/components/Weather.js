import React from "react";

const Weather = props => (
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
            id="homcurrent-weathere"
            role="tabpanel"
            aria-labelledby="current-weather-tab"
          >
            {props.city && props.country && (
              <p>
                Location: {props.city}, {props.country}
              </p>
            )}
            {props.temperature && <p>Temperature: {props.temperature}</p>}
            {props.wind && <p>Wind force: {props.wind}</p>}
            {props.humidity && <p>Humidity: {props.humidity}</p>}
            {props.description && <p>Conditions: {props.description}</p>}
            {props.sunrise && <p>Sunrise: {props.sunrise}</p>}
            {props.sunset && <p>Sunset: {props.sunset}</p>}
            {props.error && <p>{props.error}</p>}
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

export default Weather;
