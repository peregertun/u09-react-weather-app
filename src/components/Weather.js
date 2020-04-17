import React from "react";

class Weather extends React.Component {
  render() {
    return (
      <div>
        {this.props.city && (
          <div className="card bg-green">
            <div className="card-body">
              {this.props.city && this.props.country && (
                <div>
                  <span className="text-uppercase">Current weather in: </span>
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
                    <h4 className="mt-4">
                      <span className="text-muted">Temperature:</span>{" "}
                      <strong>{this.props.temp}&deg;</strong>
                    </h4>
                    <p>
                      This feels like:{" "}
                      <strong>{this.props.feelsLike}&deg;</strong>
                    </p>

                    <img
                      src={`http://openweathermap.org/img/wn/${this.props.icon}@2x.png`}
                      alt="Icon"
                      width="50"
                      height="50"
                    />
                    <h5 className="text-capitalize">{this.props.weather}</h5>
                  </div>
                )}

              <div>
                <ul className="list-unstyled mt-4">
                  {this.props.wind && this.props.deg && this.props.humidity && (
                    <li>
                      Wind force:{" "}
                      <strong>
                        {this.props.wind} {this.props.deg}
                      </strong>{" "}
                      and humidity: <strong>{this.props.humidity}</strong>
                    </li>
                  )}
                  {this.props.sunRise && this.props.sunSet && (
                    <li>
                      The sun rises at <strong>{this.props.sunRise}</strong> and
                      sets at <strong>{this.props.sunSet}</strong> (local time).
                    </li>
                  )}
                  {this.props.error && <li>{this.props.error}</li>}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Weather;
