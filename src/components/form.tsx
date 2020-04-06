import React from "react";

class Form extends React.Component {
  render() {
    return (
      <form>
        <input
          id="searchField"
          name="searchQuery"
          type="text"
          placeholder="Search location here..."
        />
      </form>
    );
  }
}

export default Form;
