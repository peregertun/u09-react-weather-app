import React from "react";

class Jumbotron extends React.Component {

  render() {
    return (
      <div className="col-12">
        <div className="jumbotron">
          <h1 className="display-4">Weather in </h1>
          <p className="lead">
            Country: 
          </p>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
