import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { render } from "@testing-library/react";

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: this.props.prog,
    };
  }

  render() {
    let temperatureArray = [];
    let temperatureDateArray = [];
    let apiResponse = this.props.prog.list;
    for (let i = 0; i < apiResponse.length; i++) {
      temperatureArray.push(apiResponse[i].main.temp);
      temperatureDateArray.push(apiResponse[i].dt_txt);
    }

    const chartData = {
      labels: temperatureDateArray,
      datasets: [
        {
          label: "Temperature",
          data: temperatureArray,
          backgroundColor: "gray",
          borderWidth: 5,
        },
      ],
    };

    return (
      <div className="graph">
        <div>
          <Line data={chartData} />
        </div>
      </div>
    );
  }
}
export default Graph;
