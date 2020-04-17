import React from "react";

class Forecast extends React.Component {
  render() {
    return (
      <div className="card bg-grey">
        <div className="card-body">
          <ul className="list-unstyled">
            {this.props.prog.map((item) => (
              <li key={item["dt"]} data-date={item.dt_txt}>
                {item.dt_txt}
                {item.main.temp}
                {item.main.feels_like}

                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="Icon"
                  width="50"
                  height="50"
                />
              </li>
            ))}
          </ul>          
        </div>
      </div>
    );
  }
}

export default Forecast;
