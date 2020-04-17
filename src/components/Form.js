import React from "react";

const Form = (props) => (
  <form className="form-inline my-2 my-lg-0 float-right" onSubmit={props.handleSubmit}>
    <input
      className="form-control mr-sm-2"
      type="text"
      name="city"
      placeholder="Search city"
      aria-label="Search"
      onChange={props.handleChange}
    ></input>
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
      Search
    </button>
  </form>
);

export default Form;
