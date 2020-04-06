import React from "react";
import Form from "./components/form";
import Footer from "./components/footer";
import "./App.css";

function App() {
  return (
    <div className="main">
      <Form />
      <h1>u09-react-weather-app</h1>

      <div id="flex-container">
        <div id="smallCard">nåt</div>
        <div id="smallCard">nåt annat</div>
        <div id="smallCard"></div>
      </div>

      <div id="card">nån component</div>

      <Footer />
    </div>
  );
}

export default App;
