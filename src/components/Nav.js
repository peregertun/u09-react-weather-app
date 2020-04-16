import React from "react";
import PropTypes from "prop-types";
import Form from "./Form";
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: this.props.city,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ city: event.target.value });
    console.log(1);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.callback(this.state.city);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Weather App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav mr-auto">- Built in React</div>
          <Form
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>
      </nav>
    );
  }
}

Nav.protoTypes = {
  callback: PropTypes.func,
};

export default Nav;
