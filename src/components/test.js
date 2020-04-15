import React from "react";

class Form2 extends React.Component {
    
  constructor() {
    super();

    this.displayData = [];

    this.state = {
      showdata: this.displayData,
      postVal: "",
      id: 0
    };

    this.prependData = this.prependData.bind(this);
    this.handleChange = this.handleChange.bind(this); 
  }

  prependData() {
      this.setState({id: 2})
    console.log(this.id);
    this.displayData.unshift(
      <div id="display-data" key="1">
        <pre>{this.state.postVal}</pre>
      </div>
    );
    this.setState({
      showdata: this.displayData,
      postVal: "",
    });
  }

  handleChange(e) {
    let getTextAreaValue = e.target.value;
    this.setState({
      postVal: getTextAreaValue,
      
    });
  }

  render() {

    return (
      <div id="mainContainer">
        <textarea
          rows="4"
          cols="50"
          value={this.state.postVal}
          onChange={this.handleChange}
        ></textarea>
        <div>
          <input
            type="submit"
            className="button"
            onClick={this.prependData}
            value="show text"
          />
        </div>
        <div id="display-data-Container">{this.displayData}</div>
      </div>
    );
  }
}

export default Form2;
