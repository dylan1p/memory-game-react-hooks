import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <App imageHeight={100} imageWidth={100} noOfItems={8} />,
  document.getElementById("root")
);
