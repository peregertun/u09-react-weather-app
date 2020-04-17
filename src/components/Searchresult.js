
import React from "react";

const Searchresult = () => (

<div className="row">
    <div className="col-12">
    <div className="card mb-2 p-1 bg-dark text-light">
        {this.state.city && (
        <span className="text-uppercase text-center">
            You searched for: <strong>{this.state.city}</strong>
        </span>
        )}

        <div id="mainContainer">
        <textarea
            rows="1"
            cols="20"
            value={this.state.city}
            onChange={this.handleChange}
        ></textarea>
        <div>
            <input
            type="submit"
            className="button"
            onClick={this.prependData}
            value="Save this location"
            />
        </div>
        <div id="display-data-Container">{this.displayData}</div>
        </div>
    </div>
    </div>
</div>
);

export default Searchresult;