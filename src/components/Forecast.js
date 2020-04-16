import React from "react";

class Forecast extends React.Component {
  render() {
    return (
      <div className="col-8 mt-2">
        {this.props.city && (
          <div className="card bg-grey">
            <div className="card-body">
              {this.props.city && this.props.country && (
                <div>
                  <span className="text-uppercase">5-day forecast: </span>
                  <h3>
                    {this.props.city}, {this.props.country}
                  </h3>
                </div>
              )}

              

              <div>
                {this.props.city && (
                  <button href="/" className="btn btn-light float-right mt-2">
                    <span role="img" aria>
                      ♥️
                    </span>{" "}
                    Save location
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Forecast;
