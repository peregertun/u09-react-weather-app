import React from "react";

class Forecast extends React.Component {
  render() {
    
    return (
        <div className="card bg-grey">
          <div className="card-body">

            <ul className="list-unstyled">
              {this.props.prog.map((item) => (
                <li key={item['dt']}>
                  {item.dt_txt}
                  {item.dt_txt}
                  {item.dt_txt}
                  {item.dt_txt}
                  {item.dt_txt}
                  {item.dt_txt}

                </li>
              ))
              }
            </ul>

            <div>
              {this.props.city && (
                <button href="/" className="btn btn-light float-right mt-2">
                  <span role="img" aria-label="Save location">
                    ♥️
                  </span>
                  Save location
                </button>
              )}
            </div>
          </div>
        </div>
    );
  }
}

export default Forecast;
