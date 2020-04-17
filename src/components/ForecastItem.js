import React, { Component } from 'react';
import PropTypes from "prop-types";
import styles from "./ForecastItem.css"

export class ForecastItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    dayBuilder = (d) => {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let day = days[d.getDay()];
        return day;
    };

    timeBuilder = (currentDay) => {
        let hours = "0" + currentDay.getHours();
        let minutes = "0" + currentDay.getMinutes();
        let seconds = "0" + currentDay.getSeconds();
        let time = hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return time;
    };

    CF = () => {
        if (this.props.unit === "metric") {
            return "C"
        } else if (this.props.unit === "imperial") {
            return "F"
        }
    }

    windUnit = () => {
        if (this.props.unit === "metric") {
            return "m/s"
        } else if (this.props.unit === "imperial") {
            return "knot"
        }
    }

    convertDir = (deg) => {
        let compass = [
            "N",
            "NNE",
            "NE",
            "ENE",
            "E",
            "ESE",
            "SE",
            "SSE",
            "S",
            "SSW",
            "SW",
            "WSW",
            "W",
            "WNW",
            "NW",
            "NNW",
            "N",
        ];
        const index = Math.round((deg % 360) / 22.5);
        return compass[index];
    };

    render(props) {

        const { value } = this.props;
        const currentDay = new Date(value.dt * 1000);
        const currentDayFormated = this.dayBuilder(currentDay)

        return (
            <div className={`${currentDayFormated} allDays`}>
                <div className="threeHourForecastItem">{this.timeBuilder(currentDay)}</div>
                <div className="threeHourForecastItem">{value.weather[0].description}</div>
                <div className="threeHourForecastItem">{this.props.value.main.temp} {this.CF()}</div>
                <div className="threeHourForecastItem">{value.wind.speed} {this.windUnit()} {value.wind.deg} {this.convertDir(this.props.value.wind.deg)}</div>
                <div className="threeHourForecastItem">{value.main.humidity}</div>
            </div>
        )
    }
}

export default ForecastItem
