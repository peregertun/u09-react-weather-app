import React from "react";

class Form extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.getWeather}>
          <input type="text" name="city" placeholder="Search city"></input>
          <button className="btn btn-primary btn-lg">
            Get weather
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
